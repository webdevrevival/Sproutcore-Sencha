Touchodo.MainPane = Sproutcha.TabPane.extend({

  childViews: 'todos settings'.w(),

  todos: Sproutcha.View.extend({
    init: function() {
      var ext = new Ext.Panel({
        title: 'Todos',
        iconCls: 'home',
        html: 'Todos Go Here'
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
