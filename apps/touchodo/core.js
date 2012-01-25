// ==========================================================================
// Project:   Touchodo
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Touchodo */

/** @namespace

  Touchodo! Touch your toods!
  
  @extends SC.Object
*/
Touchodo = SC.Application.create(
  /** @scope Touchodo.prototype */ {

  NAMESPACE: 'Touchodo',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),
  
  // Define a "namespace" for our statechart states
  States: {}

}) ;
