sc_require('views/todos/view');

Touchodo.TodosState = Sproutcha.TabState.design({
  contentView: Touchodo.TodosView.extend({}),

  initialSubstate: 'viewingList',

  viewingList: SC.State.design({
    enterState: function() {
      var view = this.getPath('parentState.contentView');

      if (!SC.none(view)) {
        view.setActiveItem(0);
      }
    },

    viewTodoAction: function(todo) {
      this.gotoState('viewingTodo', this);
    },

    toggleTodoAction: function(todo) {
      todo.toggleProperty('isFinished');
    }
  }),

  viewingTodo: SC.State.design({
    enterState: function() {
      var view = this.getPath('parentState.contentView');

      if (!SC.none(view)) {
        view.setActiveItem(1);
      }
    }
  })
})
