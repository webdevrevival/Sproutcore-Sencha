if (typeof Ext === 'undefined') {
  Sproutcha.Record = SC.Record.extend({});
} else {
  Sproutcha.Record = SC.Record.extend({

    ext_data_changes: 0,


    /*
     * Create a property that can be more easily observed by controllers
     * that are watching for changes.
     */
    set: function(key, value) {
      var update = false;

      if (this._ext_fields.contains(key)) {
        var current = this.get(key);

        if (current !== value) {
          update = true;
        }
      }

      sc_super();

      if (update) {
        this.incrementProperty('ext_data_changes');
      }
    },



    /*
     * Returns an object suitable for Ext stores.
     */
    ext_data: function() {
      var self = this;
      var modelName = this.constructor.toString().split('.').lastObject();
      var hash = {};

      this._ext_fields.forEach(function(field) {
        if (field === self.primaryKey) {
          hash[field] = self.get(field);
        } else {
          hash[field] = self._convert_to_ext_data(self.get(field));
        }
      });

      return hash;
    }.property('ext_data_changes').cacheable(),


 
    /*
     * Properly recurses over an object and gathers all Ext data
     * available. If the leaf objects do not respond to toExtData(),
     * the object itself is returned.
     */
    _convert_to_ext_data: function(obj) {
      var self = this;
      
      if (SC.none(obj)) {
        return obj;
      } 
      
      /*
       * Check for an Enumerable
       */
      if (obj.forEach) {
        var newEnum = [];
        
        obj.forEach(function(o, i) {
          newEnum.pushObject(self._convert_to_ext_data(o));
        });
        
        return newEnum;
      } 

      /*
       * Check for an SC.DateTime
       */
      if (SC.kindOf(obj, SC.DateTime)) {
        return new Date(obj.get('milliseconds'));
      }
      
      /*
       * Check to see if the object responds to ext_data
       */
      if (obj.ext_data) {
        return obj.get('ext_data');
      } else { 
        return obj;
      } 
    }

  });

  SC.mixin(Sproutcha.Record, {
    registerModels: function() {
      Sproutcha.Record.subclasses.forEach(function(klass) {
        var sklass = klass.toString();
        var arr = sklass.split('.');

        var modelName = arr.lastObject();

        if (!Ext.ModelMgr.isRegistered(modelName)) {
          var fields = [];

          for (key in klass.prototype) {
            if (SC.kindOf(klass.prototype[key], SC.RecordAttribute)) {
              fields.push(key);
            }
          }

          SC.getPath(sklass).ext_model = Ext.regModel(modelName, {
            fields: fields 
          });

          klass.prototype._ext_fields = fields;
        }
      });
    }
  });

  SC.ready(Sproutcha.Record, 'registerModels');
}
