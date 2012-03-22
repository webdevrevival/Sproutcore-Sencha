/**
 * @class Sproutcha.TabApplication Represents an application that uses tab-based
 * navigation in a bottom tab-bar.
 */
Sproutcha.TabApplication = SC.Application.extend(SC.StatechartManager, {

  /**
   * @private
   *
   * Do not automatically initialize the statechart! This is very important
   * to ensure that the Ext models are properly registered.
   */
  autoInitStatechart: NO,


  /**
   * A reference to the created Ext.Application object. This will be set
   * automatically when calling the start() method. You should not need to
   * set this manually, however, you may wish to modify some properties
   * after calling start().
   */
  extApplication: null,

  
  /**
   * A reference to the Ext.TabPanel that hosts the views. This will be set
   * automatically when calling the start() method. You should not need to
   * set this manually, however, you may wish to modify some properties
   * after calling start().
   */
  extTabPanel: null,


  /**
   * Allows you to handle any startup before the tabs load. You can gather
   * data, require login, etc.
   *
   * Defaults to null.
   *
   * @property {SC.State}
   */
  startingState: null,


  /**
   * The states of the application which will appear as tabs at the bottom of
   * the screen.
   *
   * Must be provided or an error will be thrown.
   *
   * @property {Object,Array} tabStates A list or object containing a list of Sproutcha.TabStates.
   */
  tabStates: null,


  /**
  * @private Calls any methods that need to start at the beginning.
  */
  init: function() {
    sc_super();

    SC.ready(this, '_initTabStates');
  },



  /**
  * @private Initializes the tab states.
  */
  _initTabStates: function() {
    var self = this;
    var tabStates = this.get('tabStates');

    if (SC.none(tabStates)) {
      throw new Error("Sproutcha.TabApplication expects at least one Sproutcha.TabState to be provided!");
    }

    for (key in tabStates) {
      var state = tabStates[key];

      // Check to make sure we aren't a state plugin
      if (state.statePlugin) {
        tabStates[key] = state = state();
      }

      if (SC.kindOf(state, SC.State) && !SC.kindOf(state, Sproutcha.TabState)) {
        throw new Error("All tabStates must extend from Sproutcha.TabState; '%@' does not.".fmt(key));
      }
    }

    var rootState = SC.State.design({
      initialSubstate: 'startup',

      startup: SC.State.design({
        enterState: function() {
          // _initExtApp() will call self.gotoState('starting') when the Ext application launches
          self._initExtApp(this);
        }
      }),

      starting: self.startingState || SC.State.design({
        enterState: function() {
          self.gotoState('started', this);
        }
      }),

      started: SC.State.design(tabStates, {
        substatesAreConcurrent: YES
      })
    });

    this.set('rootState', rootState);
  },

  _initExtApp: function(currentState) {
    var self = this;

    var app = new Ext.Application({
      name: 'Sencha',

      launch: function() {
        SC.RunLoop.begin();

        var tabs = Sproutcha.TabApplicationManager.get('tabs');

        var tabPanel = new Ext.TabPanel({
          fullscreen: true,

          layout: 'fit',

          cardSwitchAnimation: 'fade',

          tabBar: {
            dock: 'bottom',

            ui: 'dark',

            layout: {
              pack: 'center'
            }
          },

          items: tabs.getEach('containerView').map(function(view) {
            if (!SC.none(view)) {
              return view.get('ext');
            }
          })
        });

        SC.RunLoop.end();

        self.set('extTabPanel', tabPanel);
        self.gotoState('starting', currentState);
      }
    });

    this.set('extApplication', app);
  }

});

Sproutcha.TabApplicationManager = SC.Object.create({
  tabs: [],

  registerTab: function(tab) {
    var tabs = this.get('tabs');

    tabs.pushObject(tab);
  }
});
