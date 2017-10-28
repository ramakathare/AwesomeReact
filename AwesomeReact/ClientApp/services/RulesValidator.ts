import { IFormInput, 
    IFormInputRule, 
    IFormInputRule_Required, 
    IFormInputRule_MaxLength, 
    IFormInputRule_RegEx, 
    IFormInputRule_EqualTo, 
    IFormModel,
    IFormModelProperties
} from "../interfaces";

import { FormInputValidator } from './FormInputValidator';

export class RulesValidator {

    //Indexer
    [key: string]: (ruleKey: string, prop: IFormModelProperties, name: string) => boolean;

    //required validator
    public required = function (ruleKey: string, prop:IFormModelProperties, name: string): boolean{
        //true means input is valid
        var formInput = prop[name] as IFormInput;
        if (formInput.rules) {
            var rule = formInput.rules[ruleKey] as IFormInputRule_Required;
            var value = formInput.value;

            if(rule) if (!rule.value) return true;
            if (value) return true;
        }
        return false;
    };

    //max length validator
    public maxLength = function (ruleKey: string, prop:IFormModelProperties, name: string): boolean  {
        var formInput = prop[name] as IFormInput;
        if (formInput.rules) {
            var rule = formInput.rules[ruleKey] as IFormInputRule_MaxLength;
            if (rule) {
                var value = formInput.value;
                return value.length <= rule.value
            }
        }
        return false;
    };

    //A regular expression validator.
    public regExp = function (ruleKey: string, prop:IFormModelProperties, name: string): boolean  {
        var formInput = prop[name] as IFormInput;
        if (formInput.rules) {
            var rule = formInput.rules[ruleKey] as IFormInputRule_RegEx;
            if (rule) {
                var value = formInput.value;
                let pattern = new RegExp(rule.value);
                return pattern.test(value);
            }
        }
        return false;
    };

    //to compare two fields. Mainly used in confirm password and password
    public equalTo = function (ruleKey: string, prop:IFormModelProperties, name: string): boolean  {
        var formInput = prop[name] as IFormInput;
       
        if (formInput.rules) {
            var rule = formInput.rules[ruleKey] as IFormInputRule_EqualTo;
            if (rule) {
                var value = formInput.value;
                var otherFormInput = prop[rule.value] as IFormInput;

                //if the other form input the value is compared with is dirty no need to check
                if (!otherFormInput.dirty) return true;

                //if the other form input is not dirty, since we are validating this form input the 
                //other form input if has the same rule, it can be set failed = false
                if (otherFormInput.rules)
                    if (otherFormInput.rules.equalTo) {
                        otherFormInput.rules.equalTo.failed = false;
                        //since we are manually setting the failed property. need to reset the form input validity
                        FormInputValidator.setFormInputValidity(otherFormInput);
                    }
                
                //finally if all is well then check the two form inputs values and return true if they are same
                if (otherFormInput.value == value) {
                    return true;
                }
            }
        }
        return false;
    };
}