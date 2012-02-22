Touchodo.TodosListView = Sproutcha.View.extend({

  _list: null,

  ext_storeBinding: 'Touchodo.todosController.ext_store',
  ext_storeDidChange: function() {
    this._list.bindStore(this.get('ext_store'));
  }.observes('ext_store'),

  init: function() {
    var list = new Ext.List({
      itemTpl: new Ext.XTemplate("<div class='todo'><span class='completed-tick {[this.imgClass(values)]}'></span>{description}</div>", {
        imgClass: function(values) {
          return values.isFinished ? 'active' : 'inactive';
        }
      }),

      store: null
    });

    list.on('itemtap', function(listView, index, listItem, evt) {
      var todo = Touchodo.todosController.objectAt(index);

      if (!SC.none(todo)) {
        if ($(evt.target).hasClass('completed-tick')) {
          Touchodo.sendAction('toggleTodoAction', todo);
        } else {
          Touchodo.sendAction('viewTodoAction', todo);
        }
      }
    });

    this._list = list;

    var panel = new Ext.Panel({
      layout: 'fit',

      items: [
        list
      ]
    });

    this.set('ext', panel);
  }

});
