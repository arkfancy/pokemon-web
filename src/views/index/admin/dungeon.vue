<template>
	<div id="view-admin-dungeon">
		<el-container>
			<el-aside width="200">
				<el-menu :default-active="dungeonMenuActive" class="el-menu-vertical" :collapse="menuCollapse" @select="dungeonMenuSelect"
				 ref="dungeonMenu">
					<el-menu-item index="collapse">
						<i class="el-icon-arrow-left" v-show="!menuCollapse" />
						<i class="el-icon-arrow-right" v-show="menuCollapse" />
						<span slot="title">收缩</span>
					</el-menu-item>
					<el-menu-item index="add">
						<i class="el-icon-document-add" />
						<span slot="title">记录副本</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<el-row v-show="dungeonMenuActive=='add'">
					<add />
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'view-admin-dungeon',
		components: {
			add: () => import('./dungeon/add.vue')
		},
		data() {
			return {
				menuCollapse: false,
				dungeonMenuActive: "add",
			}
		},
		mounted() {
			this.dungeonMenuSelect("add");
		},
		methods: {
			dungeonMenuSelect(index) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.dungeonMenu.activeIndex = this.dungeonMenuActive;
					return;
				}
				this.dungeonMenuActive = index;
			}
		}
	}
</script>

<style>
</style>
