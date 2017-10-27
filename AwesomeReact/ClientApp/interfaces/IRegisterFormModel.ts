import { IFormModel, IFormInput } from './IFormModel';

export interface IRegisterFormModel extends IFormModel {
    email: IFormInput,
    password: IFormInput,
    confirmPassword: IFormInput,
    getModel: () => {
        email: string,
        password: string,
        confirmPassword: string
    }
}