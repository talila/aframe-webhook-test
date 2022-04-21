AFRAME.registerComponent('combinable', {
    schema: {
        combination: {type: 'string'}
    },

    init: function(){
      this.combinationSys = document.querySelector('a-scene').systems["combinationSystem"];
      this.combinationSys.registerCombinable(this);
    },

    remove: function(){
      this.combinationSys.unregisterCombinable(this);
    }
});

AFRAME.registerComponent('combination-trigger', {
  schema: {
    combination: {type: 'string'},
    radius: {type: 'float'}
  },

  init: function(){
    this.combinationSys = document.querySelector('a-scene').systems["combinationSystem"];
    this.combinationSys.registerTrigger(this);
    this.fulfilled = false;
  },

  remove: function(){
    this.combinationSys.unregisterTrigger(this);
  }
});

AFRAME.registerComponent('combination-model', {
  schema: {
    combination: {type: 'string'},
  },

  init: function(){
    this.combinationSys = document.querySelector('a-scene').systems["combinationSystem"];
    this.combinationSys.registerModel(this);
    this.el.setAttribute('visible', false);
  },

  remove: function(){
    this.combinationSys.unregisterModel(this);
  }
});

AFRAME.registerComponent('combo-video', {
  init: function(){
    src = document.querySelector(this.el.getAttribute('src'));
    src.pause();
  },
})