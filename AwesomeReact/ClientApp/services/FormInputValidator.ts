import { IFormInput, IFormInputRule, IFormInputRule_Required, IFormInputRule_MaxLength, IFormInputRule_RegEx, IFormInputRule_EqualTo, IFormModel } from "../interfaces";


export abstract class FormInputValidator {

    public static validate(form: IFormModel, name: string) {
        var formInput = form[name];
        this.validateFormInput(formInput, form.getModel());
        if (formInput.isInvalid) {
            form.validity = form.validity || {};
            form.validity[name] = formInput.isInvalid;
        }

        //this.setFormValidity(form);
    }

    //private static setFormValidity(form: IFormModel) {
    //    form.isValid = true;
    //    if (form.validity) {
    //        for (var key in form.validity) {
    //            if (form.validity[key]) {
    //                form.isValid = false;
    //                break;
    //            }
    //        } 
    //    } else {
    //        form.isValid = false;
    //    }
    //}

    private static validateFormInput(formInput: IFormInput, formModel: any) {
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
                    var result = validator[key](rule, formInput.value, formModel);
                    rule.failed = !result;
                    if (rule.failed) {
                        formInput.isInvalid = true;
                        break;
                    }
                } 
            }
        }
    }
}

export class RulesValidator {
    [key: string]: (rule: IFormInputRule, value: string, formModel: any) => boolean;
    public required = function(rule: IFormInputRule_Required, value: string, formModel: any): boolean{
        //rule value is set to false
        if (!rule.value) return true;
        if (value) return true;
        return false;
    };
    public maxLength = function(rule: IFormInputRule_MaxLength, value: string, formModel: any): boolean  {
        return value.length <= rule.value
    };
    public regExp = function(rule: IFormInputRule_RegEx, value: string, formModel: any): boolean  {
        let pattern = new RegExp(rule.value);
        return pattern.test(value) //returns false
    };
    public equalTo = function (rule: IFormInputRule_EqualTo, value: string, formModel: any): boolean  {
        if (value) return formModel[rule.value] == value;
        else return true;
    };
}


///check with pristinity - classic example password - confirm password
/// form level validity check