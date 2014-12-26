#Wizard for Semantic-UI > 1.0#
==================
![](http://cs14107.vk.me/c624329/v624329723/10d3e/-M76GIYHCvI.jpg)
##How use:##
```
$(function () {
  var wizard = new WizardModule({
              idForm: 'task-form',
              callable: {
                  beforeInit: function (event, obj) {
                  },
                  afterInit:function(event,obj){
                  }
              }
          });
          wizard.init();
});
```
