"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	// baseURL: process.env.baseURL || process.env.apiUrl || ""
	// timeout: 60 * 1000, // Timeout
	// withCredentials: true, // Check cross-site Access-Control
	baseURL: 'http://www.arkfancy.com/api',
	// baseURL: 'http://localhost:9101/'
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		return config;
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error);
	}
);

// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		// Do something with response data
		return response;
	},
	function(error) {
		// Do something with response error
		if (401 === error.response.status) {
			// 处理401 跳转到登录页
			let loginUrl = error.response.data;
			window.location = loginUrl;
		} else {
			return Promise.reject(error);
		}
	}
);

// Plugin.install = function(Vue, options) {
Plugin.install = function(Vue) {
	Vue.axios = _axios;
	window.axios = _axios;
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios;
			}
		},
		$axios: {
			get() {
				return _axios;
			}
		},
	});
};

Vue.use(Plugin)

export default Plugin;
