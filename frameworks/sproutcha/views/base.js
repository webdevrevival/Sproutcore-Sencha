Sproutcha.View = SC.Object.extend({
      
  ext: null,
  parentView: null,
      
  init: function() {
    var panel = new Ext.Panel({
      html: 'override init() to change'
    }); 
    
    this.set('ext', panel);
  }
      
});
