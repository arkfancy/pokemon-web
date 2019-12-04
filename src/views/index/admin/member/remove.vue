<template>
	<div id="view-admin-member-remove">
		<el-col>
			<h2>成员离开</h2>
		</el-col>
		<el-col align="center">
			<el-form ref="memberRemoveForm" label-width="80px" style="max-width: 400px;text-align: left;">
				<el-form-item label="成员">
					<el-select v-model="memberId" filterable>
						<el-option v-for="item in memberData" :key="item.memberId" :label="item.memberName" :value="item.memberId" />
					</el-select>
				</el-form-item>
				<el-form-item label="离开日期">
					<el-date-picker placeholder="选择日期" v-model="leaveDate" value-format="yyyy-MM-dd" />
				</el-form-item>
				<el-form-item>
					<el-button @click="leaveMember">离开</el-button>
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
				memberId: null,
				leaveDate: new Date(),
				memberData: []
			}
		},
		mounted() {
			this.getMember();
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
			leaveMember() {
				if (this.memberId == null || this.memberId == '') {
					alert("请选择要离开的成员。");
					return;
				}
				this.confirmSubmit(() => {
					this.$axios.put("/api/pokemon/member/leave/" + this.memberId + "/" + this.leaveDate).then(res => {
						if (res.data.data) {
							alert("成员已离开。")
						} else {
							alert("离开发生异常。")
						}
					}).catch(error => {
						alert("error: " + error)
					})
				});
			}
		}
	}
</script>
