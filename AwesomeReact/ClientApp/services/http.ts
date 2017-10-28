//https://github.com/axios/axios


import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';
import * as Promise from 'bluebird';

export abstract class Http {

    static axiosInstance: AxiosInstance;
    static apiEndPoint: string = "http://localhost:42055/";

    public static Initialize() {

        this.axiosInstance = axios.create();
        this.axiosInstance.interceptors.request.use(function (config) {
            console.log("on request");
            return config;
        }, function (error) {
            console.log("on request error");
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.axiosInstance.interceptors.response.use(function (response) {
            console.log("on response");
            return response;
        }, function (error) {
            console.log("on response error");
            alert(error);
            return Promise.reject(error);
        });

    }

    

    public static get(actionUrl: string): AxiosPromise<Response> {
        return this.axiosInstance.get(this.apiEndPoint + actionUrl);
    }

    public static post(actionUrl: string, data: any): AxiosPromise<Response> {
        return this.axiosInstance.post(this.apiEndPoint + actionUrl, data);
    }
}
Http.Initialize();