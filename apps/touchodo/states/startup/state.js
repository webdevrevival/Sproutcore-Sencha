sc_require('views/panes/main');

Touchodo.StartupState = SC.State.design({

  enterState: function() {
    Touchodo.mainPane = Touchodo.MainPane.create({});

    this.gotoState('started');
  }

});
