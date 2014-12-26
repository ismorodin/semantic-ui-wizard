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

<div class="five wide column" id="wizard-container"></div>
    <div class="ten wide column">
        <div id="step_one" class="wizard-step-container" data-wiz-title="Тип задачи" data-wiz-icon-class="tasks"
             data-wiz-desc="Выберите тип задачи">
      
        </div>
        <div id="step_two" class="wizard-step-container" data-wiz-title="Сроки" data-wiz-icon-class="calendar"
             data-wiz-desc="Выберите временный параметры">       
        </div>
        <div id="step_three" class="wizard-step-container" data-wiz-title="Описание" data-wiz-icon-class="content" data-wiz-desc="Описание задачи">
          
        </div>
        <div class="wizard-buttons"></div>
    </div>
```
