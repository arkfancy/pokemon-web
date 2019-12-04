<template>
	<div id="view-admin-member-update">
		<el-col>
			<h2>级别修改</h2>
		</el-col>
		<el-col align="center">
			<el-form ref="memberupdateForm" label-width="80px" style="max-width: 400px;text-align: left;">
				<el-form-item label="成员">
					<el-select v-model="member.memberId" @change="memberIdChange" filterable>
						<el-option v-for="item in memberData" :key="item.memberId" :label="item.memberName" :value="item.memberId" />
					</el-select>
				</el-form-item>
				<el-form-item label="成员级别">
					<el-select v-model="member.rankId">
						<el-option v-for="item in rankData" :key="item.rankId" :label="item.rankName" :value="item.rankId" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="updateMember">修改</el-button>
				</el-form-item>
			</el-form>
		</el-col>

	</div>
</template>

<script>
	export default {
		name: 'view-admin-member-remove',
		data() {
			return {
				member: {
					memberId: null,
					rankId: null
				},
				memberData: [],
				rankData: [],
			}
		},
		mounted() {
			this.getMember();
			this.getRank();
		},
		methods: {
			getMember() {
				this.$axios.get("/api/pokemon/member/list").then(res => {
					if (res.data.data) {
						this.memberData = res.data.data
					}
				}).catch(function(error) {
					alert("error: " + error);
				})
			},
			getRank() {
				this.$axios
					.get("/api/pokemon/rank/list")
					.then(res => {
						this.rankData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			memberIdChange(val) {
				this.$axios.get("/api/pokemon/member/" + val).then(res => {
					this.member = res.data.data;
				}).catch(function(error) {
					alert("error: " + error);
				});
			},
			updateMember() {
				if (this.member.memberId == null || this.member.memberId == '') {
					alert("请选择要修改的成员。");
					return;
				}
				this.confirmSubmit(() => {
					this.$axios.put("/api/pokemon/member/rank/" + this.member.memberId + "/" + this.member.rankId).then(res => {
						if (res.data.data) {
							alert("成员级别已修改。")
						} else {
							alert("修改发生异常。")
						}
					}).catch(error => {
						alert("error: " + error)
					})
				});
			}
		}
	}
</script>
