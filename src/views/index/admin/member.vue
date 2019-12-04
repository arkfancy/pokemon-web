<template>
	<div id="view-admin-member">
		<el-container>
			<el-aside width="200">
				<el-menu :default-active="memberMenuActive" class="el-menu-vertical" :collapse="menuCollapse" @select="memberMenuSelect"
				 ref="memberMenu">
					<el-menu-item index="collapse">
						<i class="el-icon-arrow-left" v-show="!menuCollapse" />
						<i class="el-icon-arrow-right" v-show="menuCollapse" />
						<span slot="title">收缩</span>
					</el-menu-item>
					<el-menu-item index="add">
						<i class="el-icon-document-add" />
						<span slot="title">成员加入</span>
					</el-menu-item>
					<el-menu-item index="update">
						<i class="el-icon-document" />
						<span slot="title">级别修改</span>
					</el-menu-item>
					<el-menu-item index="remove">
						<i class="el-icon-document-remove" />
						<span slot="title">成员离开</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<el-row v-show="memberMenuActive=='add'">
					<add />
				</el-row>
				<el-row v-show="memberMenuActive=='update'">
					<update />
				</el-row>
				<el-row v-show="memberMenuActive=='remove'">
					<remove />
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menuCollapse: false,
				memberMenuActive: "add",
			}
		},
		components: {
			add: () => import("./member/add.vue"),
			update: () => import("./member/update.vue"),
			remove: () => import("./member/remove.vue")
		},
		methods: {
			memberMenuSelect(index) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.memberMenu.activeIndex = this.memberMenuActive;
					return;
				}
				this.memberMenuActive = index;
			}
		},
	}
</script>

<style>
</style>
