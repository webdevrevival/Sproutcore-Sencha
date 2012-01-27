Touchodo.todosController = SC.ArrayController.create({

  ext_store: new Ext.data.JsonStore({
    model: 'Todo',

    data: []
  }),

  content: null,

  contentDidChange: function() {
    var ext_store = this.get('ext_store'); 
    var content = this.get('content');
        
    if (!SC.none(content)) {
      var data = content.getEach('ext_data').filter(function(d) { return !SC.none(d) });

      if (!SC.none(data) && data.get('length') > 0) {
        ext_store.loadData(data);
      }
    }
  }.observes('*content.@each.ext_data_changes')

});
