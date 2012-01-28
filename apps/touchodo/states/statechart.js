sc_require('states/startup/state');
sc_require('states/started/state');

Touchodo.statechart = SC.Object.create(SC.StatechartManager, {

  /*
   * Do not automatically initialize the statechart! This is very important
   * to ensure that the Ext models are properly registered.
   */
  autoInitStatechart: NO,

  rootState: SC.State.design({

    initialSubstate: 'startup',

    startup: SC.State.plugin('Touchodo.StartupState'),
    started: SC.State.plugin('Touchodo.StartedState')
  })
});
