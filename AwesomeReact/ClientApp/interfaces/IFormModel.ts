export interface IFormModel {
    getModel: () => any,
    isInvalid?: boolean,
    [Key: string]: boolean | any
}
export interface IFormInput {
    type: string,
    name?:string,
    placeholder?: string,
    value?: any,
    defaultValue?: any,
    rules?: {
        [key: string]: IFormInputRule | undefined,
        required?: IFormInputRule,
        maxLength?: IFormInputRule,
        regex?: IFormInputRule,
        equalTo?:IFormInputRule
    },
    isInvalid?: boolean
}

export interface IFormInputRule {
    value: any,
    message: string
    failed?: boolean
}
