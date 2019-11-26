import Vue from 'vue';

Vue.mixin({
	methods: {
		confirmSubmit(todo) {
			this.$confirm("确定提交？", "提示", {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(res => {
				if (res) {
					todo()
				}
			});
		},
	}
})
