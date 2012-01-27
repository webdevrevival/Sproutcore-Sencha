if (typeof Ext === 'undefined') {
  Sproutcha.Record = SC.Record.extend({});
} else {

  Sproutcha.Record = SC.Record.extend({

    ext_data_changes: 0,
    _ext_fields: null,

    /*
     * Ensure that we register an Ext model upon creation of the first record.
     */
    init: function() {
      sc_super();

      var modelName = this.constructor.toString().split('.').lastObject();

      if (!Ext.ModelMgr.isRegistered(modelName)) {
        var fields = [];

        for (key in this) {
          if (SC.kindOf(this[key], SC.RecordAttribute)) {
            fields.push(key);
          }
        }

        this._ext_fields = fields;

        Ext.regModel(modelName, {
          fields: this._ext_fields
        });
      }
    },



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
    toExtData: function() {
      var modelName = this.constructor.toString().split('.').lastObject();
      var hash = {};

      for (key in this._ext_fields) {
        if (key === this.primaryKey) {
          hash[key] = this.get(key);
        } else {
          hash[key] = this._convert_to_ext_data(this.get(key));
        }
      }

      return hash;
    },


 
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
       * Check to see if the object responds to toExtData()
       */
      if (obj.toExtData) {
        return obj.toExtData();
      } else { 
        return obj;
      } 
    }

  });

}
