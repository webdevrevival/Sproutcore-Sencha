sc_require('models/base');

Touchodo.Todo = Touchodo.Record.extend({
  primaryKey: 'id',

  description: SC.Record.attr(String),
  isFinished: SC.Record.attr(Boolean),
  comments: SC.Record.toMany('Touchodo.Comment', { isMaster: NO })
});
