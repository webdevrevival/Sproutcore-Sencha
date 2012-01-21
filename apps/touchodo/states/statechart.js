Touchodo.statechart = SC.Object.create(SC.StatechartManager, {
  rootState: SC.State.design({
    initialSubstate: 'loading',

    loading: SC.State.design({
      enterState: function() {
        SC.RunLoop.begin();

        Touchodo.SenchaApp = new Ext.Application({
          name: 'Sencha',

          launch: function() {
            Touchodo.SENCHA_VIEWPORT = new Ext.TabPanel({
              fullscreen: true,

              layout: 'fit',

              cls: 'touchodo-app-container',

              items: [
                {
                  title: 'Home',
                  iconCls: 'home',
                  html: 'Welcome'
                },

                {
                  title: 'Woot',
                  iconCls: 'home',
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
        this.gotoState('viewing');
      }
    }),

    viewing: SC.State.design({
    })
  })
});
