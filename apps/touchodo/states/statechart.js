sc_require('states/startup/state');
sc_require('states/started/state');

Touchodo.statechart = SC.Object.create(SC.StatechartManager, {
  rootState: SC.State.design({
    initialSubstate: 'startup',

    startup: SC.State.plugin('Touchodo.StartupState'),
    started: SC.State.plugin('Touchodo.StartedState')
  })
});
