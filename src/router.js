import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'

Vue.use(Router)

let needLogin = true;

const router = new Router({
	routes: [{
		path: '/',
		redirect: '/index'
	}, {
		path: '/index',
		component: () => import("./views/index.vue"),
		children: [{
			path: '/index',
			component: () => import("./views/index/main.vue")
		}, {
			path: '/index/admin',
			meta: {
				login: needLogin
			},
			component: () => import("./views/index/admin.vue"),
		}]
	}]
})

router.beforeEach((to, from, next) => {
	if (to.meta == null || to.meta.login == null || !to.meta.login) {
		// 不需要验证登录
		next();
		return;
	}

	if (sessionStorage.getItem("arkfancy-sso")) {
		// 已经登录过 无需再次登录
		next();
		return;
	}

	// 校验登录
	let returnUrl = window.location.origin + window.location.pathname + "#" + to.fullPath;
	Axios.get("/api/sso/info", {
		params: {
			returnUrl: returnUrl
		}
	}).then(res => {
		if (res && res.data && res.data.data) {
			// 保存登录信息避免再次登录
			sessionStorage.setItem("arkfancy-sso", res.data.data);
			next();
		}
	}).catch(function(error) {
		if (401 === error.response.status) {
			let loginUrl = error.response.data;
			window.location = loginUrl;
		} else {
			return Promise.reject(error);
		}
	});
});

export default router;
