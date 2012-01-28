Sproutcha.TabPane = Sproutcha.ContainerView.extend({
  app: null,

  init: function() {
    var self = this;

    SC.RunLoop.begin();

    this.app = new Ext.Application({
      name: 'Sencha',

      launch: function() {
        self.initChildren();
        
        var children = self.get('children');

        if (SC.none(children) || children.get('length') === 0) {
          throw new Error("Sproutcha.TabPane must be created with at least one childView.");
        }

        self.ext = new Ext.TabPanel({
          fullscreen: true,

          layout: 'fit',

          tabBar: {
            dock: 'bottom',

            ui: 'dark',

            layout: {
              pack: 'center'
            }
          },

          items: self.get('children').getEach('ext')
        });
      }
    });

    SC.RunLoop.end();
  }
});
