Sproutcha.ArrayController = SC.ArrayController.extend({

  ext_store: null,

  content: null,

  contentDidChange: function() {
    var ext_store = this.get('ext_store'); 
    var content = this.get('content');
        
    if (!SC.none(content)) {
      if (SC.none(ext_store)) {

        // If there is no content, we can't figure out
        // the modelName, but we don't really need to
        // since there is no content.
        if (content.get('length') === 0) {
          return;
        }

        var modelName = SC._object_className(content.get('firstObject').constructor);

        modelName = modelName.split('.').lastObject();

        ext_store = new Ext.data.JsonStore({
          model: modelName,

          data: []
        });

        this.set('ext_store', ext_store);
      }

      var data = content.getEach('ext_data').filter(function(d) { return !SC.none(d) });

      if (!SC.none(data) && data.get('length') > 0) {
        ext_store.loadData(data);
      }
    }
  }.observes('*content.@each.ext_data_changes')

});
