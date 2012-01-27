Sproutcha.ContainerView = Sproutcha.View.extend({

  childViews: [],

  init: function() {
    var self = this;

    var childViewKeys = this.get('childViews');
    var childViews = childViewKeys.map(function(key) {
      var viewClass = self.get('key');

      // If the view has already been initialized, just
      // return it. We really should never do this though...
      if (SC.instanceof(viewClass, Sproutcha.View)) {
        viewClass.parentView = self;

        return viewClass;
      }

      if (!SC.kindOf(viewClass, Sproutcha.View)) {
        throw new Error("Sproutcha.View.create() expects the childViews property to contain only Sproutcha.Views!");
      }

      return viewClass.create({
        parentView: self
      });
    });

    var panel = new Ext.Panel({
      items: childViews.getEach('ext')
    }); 
    
    this.set('ext', panel);
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
