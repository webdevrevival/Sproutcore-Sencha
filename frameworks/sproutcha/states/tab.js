Sproutcha.TabState = Sproutcha.State.design({
  contentView: null,

  init: function() {
    sc_super();

    var contentView = this.get('contentView');

    if (!SC.instanceOf(contentView, Sproutcha.View)) {
      this.set('contentView', contentView.create());
    }

    Sproutcha.TabApplicationManager.registerTab(this);
  }
});
