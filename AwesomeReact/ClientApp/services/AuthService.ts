import { ArHttp, Feedback } from "../services";
import { Config } from "../config/config";
import { AxiosRequestConfig } from 'axios';
import { withCookies, Cookies } from 'react-cookie';

export interface IAuthentication {
    isAuth: boolean,
    userName: string,
    token: string,
    token_type: string
};

export abstract class AuthService {

    static _cookieService;

    public static Initialize() {
        this._cookieService = new Cookies();
        this.fillAuthData();
    }

    public static authentication: IAuthentication = {
        isAuth: false,
        userName: "",
        token: "",
        token_type: ""
    };
    private static lastRestrictedPage = "";

    //to regiser a new user
    public static saveRegistration(registration) {
        return ArHttp.post(`${Config.apiEndPoint}/api/Account/Register`, registration);
    }

    //login code. 
    public static login(loginData, callback: () => void) {
        let data = "grant_type=password&username=" + loginData.Email + "&password=" + loginData.Password;

        let options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        //The apiend point is the token end point
        ArHttp.post(`${Config.apiEndPoint}/token`, data, options).then((response:any) => {
            //once the token obtained set the local variables
            this.authentication.isAuth = true;
            this.authentication.userName = response.userName;
            this.authentication.token = response.access_token;
            this.authentication.token_type = response.token_type;

            //if the login form has remember me enabled we need to store the token in cookie with expiry data as current date + expiry of the token in seconds
            if (loginData.RememberMe) {
                var date = new Date();
                date.setSeconds(date.getSeconds + response.expires_in);
                this._cookieService.save('authorizationData', this.authentication,{ expires: date })
            }
            callback();
        });
    }
    private static _logOutCallback(isSilent) {
        //Once logged reset authentication, remove data from cookies and show message
        //this.resetAuthentication();
        //this._cookieService.remove('authorizationData');
        if (!isSilent) Feedback.info("You have successfully logged off.");
    }

    //logout service
    public static logOut(isSilent, callback: () => void) {
        ArHttp.post(`${Config.apiEndPoint}/api/Account/Logout`, null).then((response) => {
            //once logged out from server clear the local data, remove from cookies and fire callback if any
            this.resetAuthentication();
            this._cookieService.remove('authorizationData');
            this._logOutCallback(isSilent);
            callback();
        });
    }
    //reset local variables
    private static resetAuthentication() {
        this.authentication.isAuth = false;
        this.authentication.userName = "";
        this.authentication.token = "";
        this.authentication.token_type = "";
    }

    //get data from the cookies and populate the local data
    public static fillAuthData() {
        var authorizationData = this._cookieService.get("authorizationData");
        if (authorizationData) {
            var aData = authorizationData as IAuthentication;
            this.authentication.isAuth = aData.isAuth;
            this.authentication.userName = aData.userName;
            this.authentication.token = aData.token;
            this.authentication.token_type = aData.token_type;
        }
    }
}
AuthService.Initialize();
