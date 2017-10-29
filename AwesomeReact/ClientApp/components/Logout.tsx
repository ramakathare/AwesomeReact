import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, withRouter } from 'react-router-dom';

import * as ReactDOM from "react-dom";
import { AuthService } from '../services';
import { RouteRenderer } from '../routes';

export class Logout extends React.Component<RouteComponentProps<{}>, {}> {

    constructor(props:any) {
        super(props);
    }

    componentWillMount() {
        AuthService.LogOut(true, () => {
            RouteRenderer.RedirectAfterLogout(this.props.history);
        });
    }

    public render() {

        return (
            <div className="">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 card">
                        <div>
                            <h3 className="text-center">Logout</h3>
                            <div className="panel-body text-center">
                                <h3>You are getting logged out...</h3>
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}