sc_require('views/todos/list');
sc_require('views/todos/detail');

Touchodo.TodosView = Sproutcha.ContainerView.extend({

  extOptions: {
    title: 'Todos',

    iconCls: 'home',

    fullscreen: true,

    layout: 'card',

    dockedItems: [
      {
        dock: 'top',
        xtype: 'toolbar',
        title: 'Loading...'
      }
    ]
  },

  childViews: 'listView detailView'.w(),

  listView: Touchodo.TodosListView.extend(),
  detailView: Touchodo.TodosDetailView.extend()

});
