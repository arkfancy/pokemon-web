<template>
	<div id="view-admin-guild-war">
		<el-container>
			<el-aside width="200">
				<el-menu :default-active="guildWarMenuActive" class="el-menu-vertical" :collapse="menuCollapse" @select="guildWarMenuSelect"
				 ref="guildWarMenu">
					<el-menu-item index="collapse">
						<i class="el-icon-arrow-left" v-show="!menuCollapse" />
						<i class="el-icon-arrow-right" v-show="menuCollapse" />
						<span slot="title">收缩</span>
					</el-menu-item>
					<el-menu-item index="add">
						<i class="el-icon-document-add" />
						<span slot="title">记录公会战</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<el-row v-show="guildWarMenuActive=='add'">
					<add />
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'view-admin-guild-war',
		components: {
			add: () => import('./guildWar/add.vue')
		},
		data() {
			return {
				menuCollapse: false,
				guildWarMenuActive: "add",
			}
		},
		mounted() {
			this.guildWarMenuSelect("add");
		},
		methods: {
			guildWarMenuSelect(index) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.guildWarMenu.activeIndex = this.guildWarMenuActive;
					return;
				}
				this.guildWarMenuActive = index;
			}
		}
	}
</script>

<style>
</style>
