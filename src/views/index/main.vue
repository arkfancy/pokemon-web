<template>
	<div id="view-main">
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
		name: 'view-main',
		components: {
			contribution: () => import('./main/contribution.vue'),
			dungeon: () => import('./main/dungeon.vue'),
			guildWar: () => import('./main/guildWar.vue'),
			distribution: () => import('./main/distribution.vue'),
			member: () => import('./main/member.vue'),
		},
		data() {
			return {
				activeTabs: "contribution",
			}
		}
	}
</script>

<style>
</style>
