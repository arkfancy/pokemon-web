<template>
	<div id="view-admin">
		<el-tabs v-model="activeTabs">
			<el-tab-pane label="贡献" name="contribution">
				<contribution />
			</el-tab-pane>
			<el-tab-pane label="副本" name="dungeon">
				<dungeon />
			</el-tab-pane>
			<el-tab-pane label="公会战" name="guildWar">
				<guild-war />
			</el-tab-pane>
			<el-tab-pane label="仓库" name="distribution">
				<distribution />
			</el-tab-pane>
			<el-tab-pane label="成员" name="member">
				<member />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'view-admin',
		data() {
			return {
				activeTabs: "contribution",
			}
		},
		components: {
			contribution: () => import("./admin/contribution.vue"),
			distribution: () => import("./admin/distribution.vue"),
			dungeon: () => import("./admin/dungeon.vue"),
			guildWar: () => import('./admin/guildWar.vue'),
			member: () => import("./admin/member.vue")
		},
		methods: {
			// confirmSubmit(submit) {
			// 	this.$confirm("确定提交？", "提示", {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(res => {
			// 		if (res) {
			// 			submit()
			// 		}
			// 	}).catch(res => {
			// 		alert(res)
			// 	});
			// },


		},
		mounted() {}
	}
</script>

<style>
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
