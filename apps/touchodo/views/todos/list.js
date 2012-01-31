Touchodo.TodosListView = Sproutcha.View.extend({

  init: function() {
    var list = new Ext.List({
      itemTpl: new Ext.XTemplate("<div class='todo'><span class='completed-tick {[this.imgClass(values)]}'></span>{description}</div>", {
        imgClass: function(values) {
          return values.isFinished ? 'active' : 'inactive';
        }
      }),

      store: Touchodo.todosController.get('ext_store')
    });

    list.on('itemtap', function(listView, index, listItem, evt) {
      var todo = Touchodo.todosController.objectAt(index);

      if (!SC.none(todo)) {
        Touchodo.statechart.sendAction('toggleTodoAction', todo);
      }
    });

    var panel = new Ext.Panel({
      title: 'Todos',

      iconCls: 'home',

      layout: 'fit',

      dockedItems: [
        {
          dock: 'top',
          xtype: 'toolbar',
          title: 'Todos'
        }
      ],

      items: [
        list
      ]
    });

    this.set('ext', panel);
  }

});
