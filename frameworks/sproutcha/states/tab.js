Sproutcha.TabState = Sproutcha.State.design({
  containerView: null,

  init: function() {
    sc_super();

    Sproutcha.TabApplicationManager.registerTab(this);
  },

  get: function(key) {
    var val = sc_super();

    // If we find a Sproutcha.View that hasn't been created,
    // create it, save it as the original key and return.
    if (SC.kindOf(val, Sproutcha.View) && !SC.none(val.create)) {
      val = val.create();

      this.set(key, val);

      return val;
    }

    return val;
  }
});
