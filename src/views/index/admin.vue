<template>
	<div id="view-admin">
		<el-tabs v-model="activeTabs">
			<el-tab-pane label="贡献" name="contribution">
				<router-view name="contribution" @submit="confirmSubmit" />
			</el-tab-pane>
			<el-tab-pane label="副本" name="dungeon">
				<router-view name="dungeon"  @submit="confirmSubmit" />
			</el-tab-pane>
			<el-tab-pane label="仓库" name="distribution">
				<router-view name="distribution"  @submit="confirmSubmit"/>
			</el-tab-pane>
			<el-tab-pane label="成员" name="member">
				<router-view name="member"  @submit="confirmSubmit"/>
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
		methods: {
			confirmSubmit(submit) {
				this.$confirm("确定提交？", "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(res => {
					if (res) {
						submit()
					}
				}).catch(res => {
					alert(res)
				});
			},


		},
		mounted() {
		}
	}
</script>

<style>
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
