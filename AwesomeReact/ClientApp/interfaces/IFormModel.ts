export interface IFormModel {
    getModel: () => any,
    isValid?: boolean,
    validity?:any,
    [Key: string]: boolean | any

}
export interface IFormInput {
    type: string,
    name?:string,
    placeholder?: string,
    value?: any,
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
