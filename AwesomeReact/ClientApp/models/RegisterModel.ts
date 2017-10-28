import { IFormInput, IFormModel, IFormModelProperties } from '../interfaces';


export interface IRegisterFormModel extends IFormModel {
    getModel: () => {
        email: string,
        password: string,
        confirmPassword: string
    },
    prop: IRegisterFormModelProperties
}

export interface IRegisterFormModelProperties extends IFormModelProperties {
    email: IFormInput;
    password: IFormInput;
    confirmPassword: IFormInput;
}

export class RegisterModel implements IRegisterFormModel {

    constructor() { }

    public getModel = () => {
        return {
            email: this.prop.email.value,
            password: this.prop.password.value,
            confirmPassword: this.prop.confirmPassword.value
        }
    };

    public prop = {
        email: {
            type: "email",
            placeholder: "E-Mail",
            value: "",
            defaultValue: "",
            autoComplete: "off",
            rules: {
                required: {
                    value: true,
                    message: "Email is required"
                },
                maxLength: {
                    value: 100,
                    message: "Email can not exceed 100 characters",
                },
                regExp: {
                    value: "[a-zA-Z](?!.*\s).{0,246}@[a-z]{2,10}[.][a-z]{2,5}$",
                    message: "Email is invalid"
                }
            }
        },
        password: {
            type: "text",
            placeholder: "Password",
            value: "",
            autoComplete: "off",
            rules: {
                required: {
                    value: true,
                    message: "Password is required"
                },
                equalTo: {
                    value: "confirmPassword",
                    message: "Password and confirm password should match"
                }
            }
        },
        confirmPassword: {
            type: "text",
            placeholder: "Confirm Password",
            value: "",
            autoComplete: "off",
            rules: {
                required: {
                    value: true,
                    message: "Confirm Password is required"
                },
                equalTo: {
                    value: "password",
                    message: "Password and confirm password should match"
                }
            }
        }
    }

}