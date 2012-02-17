Touchodo.StartingState = SC.State.design({

  enterState: function() {
    Touchodo.store.createRecord(Touchodo.Todo, { id: 1, description: "Integrate Sencha", isFinished: false });
    Touchodo.store.createRecord(Touchodo.Todo, { id: 2, description: "Fix Models", isFinished: false });
    Touchodo.store.createRecord(Touchodo.Todo, { id: 3, description: "Fix Controllers", isFinished: false });

    Touchodo.todosController.set('content', Touchodo.store.find('Touchodo.Todo'));
  },

  toggleTodoAction: function(todo) {
    todo.toggleProperty('isFinished');
  }

});
