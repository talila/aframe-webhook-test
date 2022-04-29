AFRAME.registerSystem('combinationSystem', {
    init: function () {
      this.triggers = [];
      this.combinables = [];
      this.models = [];
    },

    tick: function() {
        for(let i = 0; i < this.triggers.length; i++){
            isFulfilled = true;

            pos1 = new THREE.Vector3();
            pos1.setFromMatrixPosition(this.triggers[i].el.object3D.matrixWorld);
            console.log(pos1)

            for(let j = 0; j < this.combinables.length; j++)
            {
                if(this.combinables[j].data.combination == this.triggers[i].data.combination)
                {
                    var pos2 = new THREE.Vector3();
                    pos2.setFromMatrixPosition(this.combinables[j].el.object3D.matrixWorld);
                    console.log(pos2)
                    distance = Math.sqrt(
                        Math.pow((pos2.x - pos1.x),2) + 
                        Math.pow((pos2.y - pos1.y),2) +
                        Math.pow((pos2.z - pos1.z),2)
                    );
                    console.log(distance)
                    if(distance > this.triggers[i].data.radius)
                    {
                        isFulfilled = false;
                    }
                }
            }

            if(isFulfilled != this.triggers[i].fulfilled)
            {
                this.triggers[i].fulfilled = isFulfilled;
                console.log("Combination: " + isFulfilled);
                for(let k = 0; k < this.models.length; k++)
                {
                    if(this.models[k].data.combination == this.triggers[i].data.combination)
                    {
                        this.models[k].el.setAttribute('visible', isFulfilled);
                        
                        if(this.models[k].el.components.hasOwnProperty('combo-video')){
                            src = document.querySelector(this.models[k].el.getAttribute('src'));
                            if(isFulfilled){
                                src.play();
                            }
                            else {
                                src.pause();
                            }
                        }
                    }
                }
            }
        }
    },

    registerCombinable: function(el){
        this.combinables.push(el);
        console.log("Registered: " + el.data.combination);
    }, 

    registerTrigger: function(el){
        this.triggers.push(el);
        console.log("Registered: " + el.data.combination);
    },

    registerModel: function(el){
        this.models.push(el);
        console.log("Registered: " + el.data.combination);
    },

    unregisterCombinable: function(el){
        var index = this.combinables.indexOf(el);
        this.combinables.splice(index, 1);
    },

    unregisterTrigger: function(el){
        var index = this.triggers.indexOf(el);
        this.triggers.splice(index, 1);
    },

    unregisterModel: function(el){
        var index = this.models.indexOf(el);
        this.models.splice(index, 1);
    }
});