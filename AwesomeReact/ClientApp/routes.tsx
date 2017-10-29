import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Layout,
    Home,
    FetchData,
    Counter,
    Register,
    Login,
    NotFound,
    Logout
} from './components';
import { AuthService, IAuthentication } from './services';
import { Redirect } from 'react-router';

export abstract class RouteRenderer {
   
    public static AuthIno: IAuthentication = AuthService.authentication;
    public static LastRestrictedPath = "/";


    static RedirectToLastRestrictedPath(history: any): any {
        history.push(this.LastRestrictedPath);
    }
    public static RedirectAfterLogout(history: any): any {
        history.push("/login");
    }
    public static RedirectAfterRegister(history: any): any {
        history.push("/login");
    }
  
    static Initialize() {
    }
    public static RenderOnlyIfAuthCheck_Passed(Component: React.ComponentClass, pathToSaveInLastRestrictedPath: string): JSX.Element {
        return (!this.AuthIno.isAuth) ? this.UnAuthorizedRenderer(pathToSaveInLastRestrictedPath) : this.NormalRender(Component);
    }
    public static RenderOnlyIfAuthCheck_Failed(Component: React.ComponentClass, pathToRedirect: string): JSX.Element {
        return (!this.AuthIno.isAuth) ? this.NormalRender(Component) : this.RedirectRender(pathToRedirect);
    }
    private static UnAuthorizedRenderer(pathToSaveInLastRestrictedPath: string) {
        this.LastRestrictedPath = pathToSaveInLastRestrictedPath;
        return this.RedirectRender("/login")
    }
    public static RedirectRender(path: string) {
        return <Redirect to={path} />;
    }
    public static NormalRender(Component: React.ComponentClass): JSX.Element {
        return <Component />;
    }
}

RouteRenderer.Initialize();

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} render={() => RouteRenderer.RenderOnlyIfAuthCheck_Passed(Counter, '/counter')} />
        <Route path='/fetchdata' component={FetchData} render={() => RouteRenderer.RenderOnlyIfAuthCheck_Passed(FetchData, '/fetchdata')} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} render={() => RouteRenderer.RenderOnlyIfAuthCheck_Failed(Login, '/login')}  />
        <Route path='/logout' component={Logout}  render={() => RouteRenderer.RenderOnlyIfAuthCheck_Passed(Logout, '/')}  />
        <Route component={NotFound} render={() => RouteRenderer.NormalRender(NotFound)} />
    </Switch>
</Layout>;
