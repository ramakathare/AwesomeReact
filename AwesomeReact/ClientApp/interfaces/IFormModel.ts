export interface IFormModel {
    getModel: () => any,
    isValid?: boolean,
    prop: IFormModelProperties
}

export interface IFormModelProperties {
    [Key: string]: IFormInput
}

type AutoCompleteOptions = "off" | "on" | undefined;
export interface IFormInput {
    type: string,
    placeholder?: string,
    dirty?: boolean,
    value?: any,
    autoComplete?: "off" | "on",
    defaultValue?: any,
    rules?: {
        [key: string]:  IFormInputRule_Required |
                        IFormInputRule_MaxLength |
                        IFormInputRule_EqualTo |
                        IFormInputRule_RegEx |
                        undefined,
        required?: IFormInputRule_Required,
        maxLength?: IFormInputRule_MaxLength,
        regExp?: IFormInputRule_RegEx,
        equalTo?:IFormInputRule_EqualTo
    },
    isInvalid?: boolean
}

export interface IFormInputRule {
    message: string
    failed?: boolean
}

export interface IFormInputRule_Required extends IFormInputRule {
    value: boolean,
}
export interface IFormInputRule_MaxLength extends IFormInputRule {
    value: number,
}
export interface IFormInputRule_RegEx extends IFormInputRule {
    value: string,
}
export interface IFormInputRule_EqualTo extends IFormInputRule {
    value: string,
}
