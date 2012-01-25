Touchodo.States.startup = SC.State.design({
  enterState: function() {
    SC.RunLoop.begin();

    Touchodo.SenchaApp = new Ext.Application({
      name: 'Sencha',

      launch: function() {
        Touchodo.SENCHA_VIEWPORT = new Ext.TabPanel({
          fullscreen: true,

          layout: 'fit',

          cls: 'touchodo-app-container',

          tabBar: {
            dock: 'bottom',

            ui: 'dark',

            layout: {
              pack: 'center'
            }
          },

          items: [
            {
              title: 'Todos',
              iconCls: 'compose',
              html: "Here's my todos!"
            },

            {
              title: 'Settings',
              iconCls: 'settings',
              html: 'Woo hoo! It works!'
            }
          ]
        });

        this.viewport = Touchodo.SENCHA_VIEWPORT;

        Touchodo.statechart.sendAction('_senchaLaunchedAction');
      }
    });

    SC.RunLoop.end();
  },

  _senchaLaunchedAction: function() {
    this.gotoState('started');
  }
});
