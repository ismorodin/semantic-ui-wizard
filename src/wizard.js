/**
 * Wizard Module For semantic-ui
 */
var WizardModule = (function () {
    var cursor = 0;//default cursor item
    var steps = [];//шаги
    var formSerialize = [];
    var config = {
        object: this,
        idForm: "form",
        stepsContainer: "wizard-container",
        stepClass: "wizard-step-container",
        buttons: {
            next: {
                html: {
                    id: "wizard-next-step",
                    class: "ui large green submit button wizard-step-button",
                    text: "Вперед",
                    type: "button"
                }
            },
            prev: {
                html: {
                    id: "wizard-prev-step",
                    class: "ui large green submit button wizard-step-button",
                    text: "Назад",
                    type: "button"
                }
            },
            submit: {
                html: {
                    id: "wizard-submit-step",
                    class: "ui large green submit button wizard-step-button",
                    text: "Сохранить",
                    type: "submit"
                }
            }
        },
        callable: {
            beforeConstruct: null,
            beforeInit: null,
            afterInit: null,
            beforeNextStep: null,
            afterNextStep: null
        }
    };
    var _showStep = function () {
        $(document).find('.' + config.stepClass).css({"display": "none"});
        $(document).find('#' + steps[cursor].id).css({"display": "block"});
    };
    var _renderStepBlock = function () {
        _renderButtons();
        var startTag = '<div class="ui vertical steps">';
        var stepsContainer = '';
        $.each(steps, function (key, step) {
            stepsContainer += '<div class="' + (key == cursor ? 'active' : '') + ' step">' +
            '<i class="' + (step.iconClass) + ' icon large"></i>' +
            '<div class="content">' +
            '<div class="title">' + step.title + '</div>' +
            '<div class="description">' + step.desc + '</div>' +
            '</div>' +
            '</div>'
        });
        var endTag = '</div>';
        var html = startTag + stepsContainer + endTag;
        $(document).find('#' + config.stepsContainer).html(html);
    };
    var _next = function () {
        var callableBefore = _utils.apply(config.callable.beforeNextStep, arguments);
        if (!callableBefore) return false;
        ++cursor;
        _renderButtons();
        _changeStep();
    };
    var _prev = function () {
        --cursor;
        _renderButtons();
        _changeStep();
    };
    //Шаг вперед или назад
    var _changeStep = function () {
        _serialize();
        _showStep();
        _renderStepBlock();
    };
    var _renderButtons = function () {
        var $prevBtn =
            $('<button type="' + config.buttons.prev.html.type
            + '" id="' + config.buttons.prev.html.id
            + '" class="' + config.buttons.prev.html.class
            + '">' +config.buttons.prev.html.text + '</button>');

        var $nextBtn =
            $('<button type="' + (config.buttons.next.html.type)
            + '" id="' + (config.buttons.next.html.id)
            + '" class="' + (config.buttons.next.html.class)
            + '">' + (config.buttons.next.html.text) + '</button>');

        var $submitBtn =
            $('<button type="' + (config.buttons.submit.html.type)
            + '" id="' + (config.buttons.submit.html.id)
            + '" class="' + (config.buttons.submit.html.class)
            + '">' + (config.buttons.submit.html.text) + '</button>');

        if (cursor < 1) {
            $(document).find('.wizard-buttons').html($nextBtn);
        } else if (cursor >= 1 && cursor < steps.length - 1) {
            $(document).find('.wizard-buttons').html($prevBtn);
            $(document).find('.wizard-buttons').append($nextBtn);
        } else {
            $(document).find('.wizard-buttons').html($prevBtn);
            $(document).find('.wizard-buttons').append($submitBtn);
        }
    };
    var _serialize = function () {
        var $form = $(document).find("#" + config.idForm);
        if ($form.length != 1) {
            throw new Error('Форма с селектором ' + $form.selector + ' не найдена!')
        }
        var serialize = $(document).find("#" + config.idForm).serializeArray();
        $.extend(formSerialize, serialize);
        return formSerialize;
    };
    var _loadStepsItems = function () {
        var $wizardSteps = $(document).find('.' + config.stepClass);
        if ($wizardSteps.length <= 2) {
            throw new Error('Контейнеры для шагов не найдены');
        }
        $.each($wizardSteps, function (index, step) {
            steps.push({
                "id": $(step).attr("id"),
                "title": undefined !== $(step).data('wiz-title') ? $(step).data('wiz-title') : '',
                "iconClass": undefined !== $(step).data('wiz-icon-class') ? $(step).data('wiz-icon-class') : '',
                "desc": undefined !== $(step).data('wiz-desc') ? $(step).data('wiz-desc') : ''
            });
        });
    };
    var setUp = function (cfg) {
        $.extend(config, cfg);
        _loadStepsItems();
        return this;
    };
    /**
     * Constructor
     * @param cfg {Array.<Object>}
     * */
    var WizardModule = function (cfg) {
        setUp(cfg);
    };
    var _registerEventList = function () {
        $(document).on("click", '#' + (config.buttons.next.html.id), _next);
        $(document).on("click", '#' + (config.buttons.prev.html.id), _prev);
    };
    var _utils = {
        apply: function (callable, arguments) {
            if (typeof callable == 'function') {
                return callable.apply(this, arguments);
            }
            return true;
        }
    };
    WizardModule.prototype = {
        constructor: WizardModule,
        get config() {
            return config;
        },
        get self() {
            return this;
        },
        get serialize() {
            return _serialize();
        },
        init: function () {
            _utils.apply(config.callable.beforeInit, arguments);
            _registerEventList();
            _renderStepBlock();
            _showStep();
        }
    };
    return WizardModule;
})();