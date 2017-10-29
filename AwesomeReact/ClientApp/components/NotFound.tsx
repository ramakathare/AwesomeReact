import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class NotFound extends React.Component<RouteComponentProps<{}>, {}> {

    public render() {

        return (
            <div className="">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 card">
                        <div>
                            <div>
                                <h1 className="text-center">Not Found</h1>
                            </div>
                            <div className="panel-body text-center">
                                <h3>Not Found Route</h3>
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}