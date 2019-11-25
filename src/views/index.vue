<template>
	<div id="view-index">
		<el-row>
			<el-col>
				<h2>Arthur <i class="el-icon-bangzhu" /> 超级精灵球</h2>
			</el-col>
			<el-col>
				<div align="right">
					<router-link to="/index" v-show="this.$router.history.current.path!='/index'">返回看板</router-link>
					<span v-show="this.$router.history.current.path!='/index'&&this.$router.history.current.path!='/index/admin'">
						| </span>
					<router-link to="/index/admin" v-show="this.$router.history.current.path!='/index/admin'">后台管理</router-link>
				</div>
			</el-col>
			<el-col>
				<router-view />
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'view-index',
		data() {
			return {
				loginInfo: {}
			}
		},
		methods: {},
		mounted() {
			this.loginInfo = sessionStorage.getItem("arkfancy-sso");
		}
	}
</script>

<style>
</style>
