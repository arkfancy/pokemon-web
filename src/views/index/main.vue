<template>
	<div id="view-main">
		<el-tabs v-model="activeTabs">
			<el-tab-pane label="贡献" name="contribution">
				<router-view name="contribution" />
			</el-tab-pane>
			<el-tab-pane label="副本" name="dungeon">
				<router-view name="dungeon" />
			</el-tab-pane>
			<el-tab-pane label="仓库" name="distribution">
				<router-view name="distribution" />
			</el-tab-pane>
			<el-tab-pane label="成员" name="member">
				<router-view name="member" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'view-main',
		data() {
			return {
				activeTabs: "contribution",
			}
		}
	}
</script>

<style>
</style>
