sc_require('models/base');

Touchodo.Comment = Touchodo.Record.extend({
  primaryKey: 'id',

  body: SC.Record.attr(String)
});
