sc_require('views/base');

Sproutcha.ToolbarView = Sproutcha.View.extend({
  title: '',

  init: function() {
    var title = this.get('title');

    this.set('ext', new Ext.Toolbar({
      dock: 'top',
      title: title,
      items: []
    }));
  }
});
