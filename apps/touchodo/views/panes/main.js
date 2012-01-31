sc_require('views/todos/list');
sc_require('views/settings/view');

Touchodo.MainPane = Sproutcha.TabPane.extend({

  childViews: 'todos settings'.w(),

  todos: Touchodo.TodosListView.extend(),
  settings: Touchodo.SettingsView.extend()

});
