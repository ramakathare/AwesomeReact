import { IFormInput, 
    IFormInputRule, 
    IFormInputRule_Required, 
    IFormInputRule_MaxLength, 
    IFormInputRule_RegEx, 
    IFormInputRule_EqualTo, 
    IFormModel,
    IFormModelProperties} from "../interfaces";

export class RulesValidator {
    [key: string]: (ruleKey: string, prop:IFormModelProperties, name: string) => boolean;
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
    public equalTo = function (ruleKey: string, prop:IFormModelProperties, name: string): boolean  {
        var formInput = prop[name] as IFormInput;
       
        if (formInput.rules) {
            var rule = formInput.rules[ruleKey] as IFormInputRule_EqualTo;
            if (rule) {
                var value = formInput.value;
                var otherFormInput = prop[rule.value] as IFormInput;
                if (!otherFormInput.dirty) return true;
                if (otherFormInput.value == value) {
                    if (otherFormInput.rules) if (otherFormInput.rules.equalTo) otherFormInput.rules.equalTo.failed = false;
                    return true;
                }
            }
        }
        return false;
    };
}