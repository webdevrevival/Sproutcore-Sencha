Sproutcha.TabState = Sproutcha.State.design({

  ext: null,

  toolbarView: null,

  contentView: null,

  init: function() {
    sc_super();

    var toolbarView = Sproutcha.ToolbarView.create();
    var contentView = Sproutcha.View.create();

    var panel = new Ext.Panel({

    });

    this.set('ext', panel);
  }

});
