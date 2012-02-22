Sproutcha.ContainerView = Sproutcha.View.extend({

  /**
  * Passed to the Ext.Panel upon creation.
  *
  * @default null
  */
  extOptions: null,

  childViews: [],

  init: function() {
    var extOptions = this.get('extOptions');

    extOptions = extOptions || {};

    var panel = new Ext.Panel(extOptions);
    
    this.set('ext', panel);
    this.initChildren();
  },

  initChildren: function() {
    this.childViewsDidChange();
  },

  childViewsDidChange: function() {
    var self = this;
    var childViews = this.get('childViews');
    var panel = this.get('ext');

    panel.setVisible('false');
    panel.removeAll();
    
    childViews.forEach(function(viewKey, index) {
      // If the view has already been initialized, just
      // return it. We really should never do this though...
      var viewClass = self.get(viewKey);
      var child;

      if (!SC.instanceOf(viewClass, Sproutcha.View) && !SC.kindOf(viewClass, Sproutcha.View)) {
        throw new Error("Sproutcha.View.create() expects the childViews property to contain only Sproutcha.Views! Found '%@' instead".fmt(viewClass.toString()));
      }

      if (SC.instanceOf(viewClass, Sproutcha.View)) {
        viewClass.parentView = self;

        child = viewClass;
      } else {
        child = viewClass.create({
          parentView: self
        });
      }

      if (!SC.none(child)) {
        panel.add(child.get('ext'));
      }
    }); 
    
    /*
    panel.doLayout();
    panel.setVisible(true);
    */
  }.observes('childViews'),

  setActiveItem: function(index) {
    this.get('ext').setActiveItem(index);
  }

});
