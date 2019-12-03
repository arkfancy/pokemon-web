// vue.config.js
module.exports = {
	// 选项...
	publicPath: "/pokemon",
	lintOnSave: false,
	devServer: {
		proxy: {
			'/pokemon': { //使用"/api"来代替"http://f.apiplus.c" 
				target: 'http://www.arkfancy.com/api', //源地址 
				changeOrigin: true, //改变源 
			}
		}
	}
}
