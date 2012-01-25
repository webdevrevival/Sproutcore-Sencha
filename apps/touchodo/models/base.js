if (typeof Ext === 'undefined') {
  Touchodo.Record = SC.Record.extend({});
} else {

  Touchodo.Record = SC.Record.extend({


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

        Ext.regModel(modelName, {
          fields: fields
        });
      }
    },



    /*
     * Returns an object suitable for Ext stores.
     */
    toExtData: function() {
      var modelName = this.constructor.toString().split('.').lastObject();
      var hash = {};

      for (key in this) {
        if (key === this.primaryKey) {
          hash[key] = this.get(key);
        } else if (SC.kindOf(this[key], SC.RecordAttribute)) {
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
