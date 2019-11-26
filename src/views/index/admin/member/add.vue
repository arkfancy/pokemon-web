<template>
	<div id="view-admin-member-add">
		<el-col>
			<h2>成员加入</h2>
		</el-col>
		<el-col align="center">
			<el-form ref="memberAddForm" :model="member" label-width="80px" style="max-width: 400px;text-align: left;">
				<el-form-item label="成员名称">
					<el-input v-model="member.memberName"></el-input>
				</el-form-item>
				<el-form-item label="成员级别">
					<el-select v-model="member.rankId">
						<el-option v-for="item in rankData" :key="item.rankId" :label="item.rankName" :value="item.rankId" />
					</el-select>
				</el-form-item>
				<el-form-item label="加入日期">
					<el-date-picker placeholder="选择日期" v-model="member.joinDate" value-format="yyyy-MM-dd" />
				</el-form-item>
				<el-form-item>
					<el-button @click="submitMember">新增</el-button>
					<el-button @click="resetMember">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				memberMenuActive: "add",
				member: {
					memberName: "",
					rankId: 4,
					joinDate: new Date()
				},
				rankData: [],
			}
		},
		mounted() {
			this.getRank();
		},
		methods: {
			memberMenuSelect(index) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.memberMenu.activeIndex = this.memberMenuActive;
					return;
				}
				this.memberMenuActive = index;
			},
			getRank() {
				this.$axios
					.get("/pokemon/rank/list")
					.then(res => {
						this.rankData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			submitMember() {
				this.confirmSubmit(() => {
					this.$axios.post("/pokemon/member", this.member).then(
						res => {
							if (res.data.data && res.data.data.id != null) {
								alert("记录成功，请返回看板查看。");
								this.member = {};
							}
						}
					)
				});
			},
			resetMember() {
				this.member.memberName = "";
				this.member.rankId = 4;
				this.member.joinDate = new Date();
			}

		}
	}
</script>

<style>
</style>
