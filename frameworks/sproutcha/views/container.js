Sproutcha.ContainerView = Sproutcha.View.extend({

  childViews: [],

  init: function() {
    this.initChildren();

    var panel = new Ext.Panel({
      items: childViews.getEach('ext')
    }); 
    
    this.set('ext', panel);
  },

  initChildren: function() {
    var self = this;

    var childViewKeys = this.get('childViews');

    this.set('children', childViewKeys.map(function(key) {
      var viewClass = self.get(key);

      // If the view has already been initialized, just
      // return it. We really should never do this though...
      if (SC.instanceOf(viewClass, Sproutcha.View)) {
        viewClass.parentView = self;

        return viewClass;
      }

      if (!SC.kindOf(viewClass, Sproutcha.View)) {
        throw new Error("Sproutcha.View.create() expects the childViews property to contain only Sproutcha.Views! Found '%@' instead".fmt(viewClass.toString()));
      }

      return viewClass.create({
        parentView: self
      });
    }));
  },

  childViewsDidChange: function() {
    var childViews = this.get('childViews');
    var panel = this.get('ext');
    
    panel.setVisible('false');
    panel.removeAll();
    
    childViews.forEach(function(child, index) {
      if (!SC.none(child)) {
        panel.add(child.get('ext'));
      }
    }); 
    
    panel.doLayout();
    panel.setVisible(true);
  }.observes('childViews')

});
