import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";
import { message } from 'antd'

const config = {
    baseURL: '/api',
    timeout: 10000,
}

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config);

        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response;
                if (data.code === 401) {
                    message.error(data.msg);
                    window.location.hash = "/login";
                    return Promise.reject(data);
                }
                if (data.code && data.code !== 200) {
                    message.error(data.msg);
                    return Promise.reject(data);
                }
                return data;
            },
            async (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    // * 常用请求方法封装
    get<T>(url: string, params?: object, _object = {}): Promise<T> {
        return this.service.get(url, { params, ..._object });
    }
    post<T>(url: string, params?: object, _object = {}): Promise<T> {
        return this.service.post(url, params, _object);
    }
    put<T>(url: string, params?: object, _object = {}): Promise<T> {
        return this.service.put(url, params, _object);
    }
    delete<T>(url: string, params?: any, _object = {}): Promise<T> {
        return this.service.delete(url, { params, ..._object });
    }
}

export default new RequestHttp(config);
