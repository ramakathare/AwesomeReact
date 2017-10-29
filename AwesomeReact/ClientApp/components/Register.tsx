import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, withRouter  } from 'react-router-dom';

import * as ReactDOM from "react-dom";
import { IRegisterFormModel,IRegisterFormModelProperties,RegisterModel } from '../models';
import { FormElementErrors } from '../tagComponents/FormElementErrors';
import { FormInputValidator, ArHttp, Feedback } from "../services";



interface IRegisterForm {
    registerForm: IRegisterFormModel
}

export class Register extends React.Component<RouteComponentProps<{}>, IRegisterForm> {
    regFormProp:IRegisterFormModelProperties;
    constructor(props:any) {
        super(props);
        this.state = {
            registerForm: new RegisterModel()
        };
        this.regFormProp = this.state.registerForm.prop;
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(state => {
            let registerForm = state.registerForm;
            let formInput = registerForm.prop[name];

            //assign value
            formInput.value = value;
            //Validate input
            FormInputValidator.TriggerChangeOnFormInput(registerForm,name);
            return {
             registerForm: registerForm
            }
        }); 
    }

    componentDidMount() {
        var $this = ReactDOM.findDOMNode(this);
        console.log($this);
        console.log("mounted");
    }

    componentWillUnmount() {
        console.log("unmounted");
    }

    CheckFormValidity(){
        FormInputValidator.CheckFormValidity(this.state.registerForm);

        //After checking validty set state is called so that validation errors if any are set on the view
        this.setState(previousState => {
            return {
                registerForm: this.state.registerForm
            }
        }); 
    }
    onSubmit(e: any) {
        e.preventDefault();
        this.CheckFormValidity();
        if (this.state.registerForm.isValid) {
            Feedback.success("Form is valid");
            var model = this.state.registerForm.getModel();
            ArHttp.post("api/account/register", model).then((response) => {
                Feedback.success("Registered successfully");
                this.props.history.push("/login");
            });
        } else {
            Feedback.error("Form is in valid");
        }
    }

    public render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 card">
                        <div>
                            <div>
                                <h3 className="text-center">Register</h3>
                            </div>
                            <div className="panel-body">
                                <form name="form" onSubmit={this.onSubmit.bind(this)} noValidate>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className={"form-control input-lg " + (this.regFormProp.email.isInvalid ? "error-input" : "")}
                                                name="email" 
                                                onChange={this.handleUserInput} 
                                                autoComplete={this.regFormProp.email.autoComplete}
                                                placeholder={this.regFormProp.email.placeholder} 
                                                value={this.regFormProp.email.value} 
                                                type={this.regFormProp.email.type} />
                                            <FormElementErrors formInput={this.regFormProp.email}></FormElementErrors>
                                        </div>
                                        <div className="form-group">
                                            <input className={"form-control input-lg " + (this.regFormProp.password.isInvalid ? "error-input" : "")}
                                                name="password" 
                                                onChange={this.handleUserInput}  
                                                autoComplete={this.regFormProp.email.autoComplete}
                                                placeholder={this.regFormProp.password.placeholder}
                                                value={this.regFormProp.password.value} 
                                                type={this.regFormProp.password.type} />
                                            <FormElementErrors formInput={this.regFormProp.password}></FormElementErrors>
                                        </div>
                                        <div className="form-group">
                                            <input className={"form-control input-lg " + (this.regFormProp.confirmPassword.isInvalid ? "error-input" : "")}
                                                name="confirmPassword"
                                                onChange={this.handleUserInput} 
                                                autoComplete={this.regFormProp.email.autoComplete}
                                                placeholder={this.regFormProp.confirmPassword.placeholder} 
                                                value={this.regFormProp.confirmPassword.value} 
                                                type={this.regFormProp.confirmPassword.type} />
                                            <FormElementErrors formInput={this.regFormProp.confirmPassword}></FormElementErrors>
                                        </div>
                                        <div className="pull-right" > Already registered? <NavLink to={'/login'} exact activeClassName='active'> Login</NavLink>
                                        </div>
                                        <input className="btn btn-lg btn-primary btn-block" defaultValue="Register" type="submit" />
                                    </fieldset >
                                </form > 
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}