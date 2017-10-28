import { IFormInput, 
    IFormInputRule, 
    IFormInputRule_Required, 
    IFormInputRule_MaxLength, 
    IFormInputRule_RegEx, 
    IFormInputRule_EqualTo, 
    IFormModel,
    IFormModelProperties} from "../interfaces";

import { RulesValidator } from './RulesValidator';

export abstract class FormInputValidator {

    public static TriggerChangeOnFormInput(form: IFormModel, name: string) {
        this.validateProperty(form.prop, name);
        this.setFormValidity(form);
    }

    static validateProperty(prop: IFormModelProperties, name: string) {
        var formInput = prop[name];

        formInput.dirty = true;
        formInput.isInvalid = false;

        let rules = formInput.rules;
        if (rules) {
            var validator = new RulesValidator();
            
            //reset all rules to valid
            for (var key in rules) {
                var rule = rules[key];
                if (rule) rule.failed = false;
            }

            //check for rules
            for (var key in rules) {
                var rule = rules[key]; 
                if (rule) {
                    rule.failed = !validator[key](key, prop, name);
                    if (rule.failed) {
                        formInput.isInvalid = true;
                        break;
                    }
                } 
            }
        }
    }

    static setFormValidity(form: IFormModel) {
        form.isValid = true;
        for(var key in form.prop){
            if (form.prop[key].isInvalid) 
            {
                form.isValid = false;
                break;
            }
        }
    }
    
    public static CheckFormValidity(form: IFormModel) {
        this.triggerChangeonForm(form);
        return form.isValid;
    }

    public static triggerChangeonForm(form: IFormModel) {
        for (let name in form.prop) {
            if(!form.prop[name].dirty)
            this.validateProperty(form.prop, name);
        }
        this.setFormValidity(form);
    } 
}

