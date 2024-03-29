// ==========================================================================
// Project:   Touchodo
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Touchodo */

/** @namespace

  Touchodo! Touch your toods!
  
  @extends SC.Object
*/
Touchodo = Sproutcha.TabApplication.create(
  /** @scope Touchodo.prototype */ {

  NAMESPACE: 'Touchodo',

  VERSION: '0.1.0',

  trace: YES,

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),

  startingState: SC.State.plugin('Touchodo.StartingState'),

  tabStates: {
    todos: SC.State.plugin('Touchodo.TodosState'),
    settings: SC.State.plugin('Touchodo.SettingsState')
  }
});
