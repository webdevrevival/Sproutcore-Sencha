Touchodo.MainPane = Sproutcha.TabPane.extend({

  childViews: 'todos settings'.w(),

  todos: Sproutcha.View.extend({
    init: function() {
      var ext = new Ext.List({
        fullscreen: false,

        layout: 'fit',

        title: 'Todos',

        iconCls: 'home',

        itemTpl: '<div>{description}</div>',

        store: Touchodo.todosController.get('ext_store')
      });

      this.set('ext', ext);
    }
  }),

  settings: Sproutcha.View.extend({
    init: function() {
      var ext = new Ext.Panel({
        title: 'Settings',
        iconCls: 'settings',
        html: 'Settings Go Here'
      });

      this.set('ext', ext);
    }
  })

});
