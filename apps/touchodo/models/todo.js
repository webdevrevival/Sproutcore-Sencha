Touchodo.Todo = Sproutcha.Record.extend({
  primaryKey: 'id',

  description: SC.Record.attr(String),
  isFinished: SC.Record.attr(Boolean),
  comments: SC.Record.toMany('Touchodo.Comment', { isMaster: NO }),

  modelName: 'Todo'
});
