import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { IFormInput } from '../interfaces'
import * as ReactDOM from "react-dom";
import { IRegisterFormModel,RegisterModel } from '../models';
import { FormElementErrors } from '../tagComponents/FormElementErrors';
import { FormInputValidator } from "../services/FormInputValidator";

interface IRegisterForm {
    registerForm: IRegisterFormModel
}

export class Register extends React.Component<RouteComponentProps<{}>, IRegisterForm> {

    constructor(props:any) {
        super(props);
        this.state = {
            registerForm: new RegisterModel()
        };
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
        var valid = FormInputValidator.CheckFormValidity(this.state.registerForm);
        this.setState(state => {
            return {
             registerForm: state.registerForm
            }
        }); 
        return valid;
    }
    onSubmit(e: any) {
        e.preventDefault();
        var validity = this.CheckFormValidity();
        if(validity) alert("valid");
    }

    public render() {
        return (
            <div className="container">
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
                                            <input onChange={this.handleUserInput} className="form-control input-lg" placeholder="E-mail Address" name="email" value={this.state.registerForm.prop.email.value} type={this.state.registerForm.prop.email.type} />
                                            <FormElementErrors formInput={this.state.registerForm.prop.email}></FormElementErrors>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleUserInput} className="form-control input-lg" placeholder="Password" name="password" value={this.state.registerForm.prop.password.value} type={this.state.registerForm.prop.password.type} />
                                            <FormElementErrors formInput={this.state.registerForm.prop.password}></FormElementErrors>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleUserInput} className="form-control input-lg" placeholder="Confirm Password" name="confirmPassword" value={this.state.registerForm.prop.confirmPassword.value} type={this.state.registerForm.prop.confirmPassword.type} />
                                            <FormElementErrors formInput={this.state.registerForm.prop.confirmPassword}></FormElementErrors>
                                        </div >
                                        <div className="pull-right" > Already registered? <NavLink to={'/login'} exact activeClassName='active'> Login</NavLink>
                                        </div >
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