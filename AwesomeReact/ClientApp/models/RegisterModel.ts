import { IRegisterFormModel, IFormInput } from '../interfaces';

export class RegisterModel implements IRegisterFormModel {

    
    constructor() {}

    
    public getModel = () => {
        return {
            email: this.email.value,
            password: this.password.value,
            confirmPassword: this.confirmPassword.value
        }
    };
    
    public email: IFormInput = {
        type: "email",
        name: "email",
        placeholder: "E-Mail",
        value: "",
        defaultValue: "",
        rules: {
            required: {
                value: true,
                message: "Email is required"
            },
            maxLength: {
                value: 100,
                message:"Email can not exceed 100 characters",
            },
            regex: {
                value: "[a-zA-Z](?!.*\s).{0,246}@[a-z]{2,10}[.][a-z]{2,5}$",
                message:"Email is invalid"
            }
        }
    }
    public password: IFormInput = {
        type: "text",
        name: "password",
        placeholder: "Password",
        value: "",
    };
    public confirmPassword: IFormInput = {
        type: "text",
        name: "confirmPassword",
        placeholder: "Confirm Password",
        value: "",
    };
    
}