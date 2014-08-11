Room.Controller = function(view){
  this.view = view;

  this.init = function(){
    this.view.bindListeners(this)
  }

  

}