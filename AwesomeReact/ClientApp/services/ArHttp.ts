//https://github.com/axios/axios


import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';
import * as Promise from 'bluebird';
import { Feedback } from './Feedback';
import { Config } from '../config/config';
import { AuthService } from '../services';
import { RouteRenderer } from '../routes';

export abstract class ArHttp {

    private static axiosInstance: AxiosInstance;
    

    public static Initialize() {

        this.axiosInstance = axios.create();
        this.axiosInstance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            Feedback.error("Request error occured.");
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.axiosInstance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            //could be more elaborate. We need parse the error object
            Feedback.error("Response error occured: " + error);
            return Promise.reject(error);
        });

    }

    private static fire(action: any,config?: AxiosRequestConfig, ) {
        if (RouteRenderer.AuthIno.isAuth && RouteRenderer.AuthIno.token) {
            config = config || {};
            config.headers = config.headers || {};
            config.headers['Authorization'] = "bearer " + RouteRenderer.AuthIno.token;
        }
        return action(config);
    }
    //Get action
    public static get(actionUrl: string, config?: AxiosRequestConfig): AxiosPromise<Response> {
        return this.fire((config) => {
            return this.axiosInstance.get(actionUrl, config)
        }, config)
    }

    //post action
    public static post(actionUrl: string, data: any, config?: AxiosRequestConfig): AxiosPromise<Response> {
        return this.fire((config) => {
            return this.axiosInstance.post(actionUrl, data, config);
        },config);
    }
    //todo add other http actions
}
ArHttp.Initialize();