Touchodo.SettingsView = Sproutcha.View.extend({

  init: function() {
    var panel = new Ext.Panel({
      title: 'Settings',

      iconCls: 'settings',

      layout: 'fit',

      dockedItems: [
        {
          dock: 'top',
          xtype: 'toolbar',
          title: 'Settings'
        }
      ],

      html: 'Settings Go Here'
    });

    this.set('ext', panel);
  }

});
