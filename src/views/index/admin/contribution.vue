<template>
	<div id="view-admin-contribution">
		<el-container>
			<el-aside width="200">
				<el-menu :default-active="contributionMenuActive" class="el-menu-vertical" :collapse="menuCollapse" @select="contributionMenuSelect"
				 ref="contributionMenu">
					<el-menu-item index="collapse">
						<i class="el-icon-arrow-left" v-show="!menuCollapse" />
						<i class="el-icon-arrow-right" v-show="menuCollapse" />
						<span slot="title">收缩</span>
					</el-menu-item>
					<el-menu-item index="add">
						<i class="el-icon-document-add" />
						<span slot="title">记录贡献</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<el-row v-show="contributionMenuActive=='add'">
					<add/>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'view-admin-contribution',
		components: {
			add: () => import('./contribution/add.vue')
		},
		data() {
			return {
				menuCollapse: false,
				contributionMenuActive: "add",
			}
		},
		mounted() {
			this.contributionMenuSelect("add");
		},
		methods: {
			contributionMenuSelect(index) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.contributionMenu.activeIndex = this.contributionMenuActive;
					return;
				}
				this.contributionMenuActive = index;
			}
		}
	}
</script>

<style>
</style>
