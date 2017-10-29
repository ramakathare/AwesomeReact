//https://github.com/axios/axios


import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';
import * as Promise from 'bluebird';
import { Feedback } from './Feedback';
import { Config } from '../config/config';

export abstract class ArHttp {

    static axiosInstance: AxiosInstance;
    

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
            Feedback.error("Response error occured: " + Error);
            return Promise.reject(error);
        });

    }

    
    //Get action
    public static get(actionUrl: string, config?: AxiosRequestConfig): AxiosPromise<Response> {
        return this.axiosInstance.get(Config.apiEndPoint + actionUrl, config);
    }

    //post action
    public static post(actionUrl: string, data: any, config?: AxiosRequestConfig): AxiosPromise<Response> {
        return this.axiosInstance.post(Config.apiEndPoint + actionUrl, data,config);
    }
    //todo add other http actions
}
ArHttp.Initialize();