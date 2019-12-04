<template>
	<div id="view-main-member">
		<el-col :xs="24" :sm="24" :md="24" :lg="24">
			<el-col>
				<h3>成员列表</h3>
			</el-col>
			<el-col>
				<el-switch v-model="onlyOnline" active-color="#13ce66" active-text="只看在线" @change="onlyOnlineChange" />
			</el-col>
			<el-col :span="22" :ofset="1">
				<el-table :data="memberData" v-show="!onlyOnline">
					<el-table-column label="成员" prop="memberName" />
					<el-table-column label="级别" prop="rankName" />
					<el-table-column label="加入日期" prop="joinDate" />
					<el-table-column label="离开日期" prop="leaveDate" />
				</el-table>
				<el-table :data="memberData" v-show="onlyOnline">
					<el-table-column label="成员" prop="memberName" />
					<el-table-column label="级别" prop="rankName" />
					<el-table-column label="加入日期" prop="joinDate" />
				</el-table>
				<el-pagination layout="sizes, prev, pager, next" :total="memberPageTotal" :page-size="memberPageSize" :current-page="memberPageCurrent"
				 @size-change="memberSizeChange" @current-change="memberCurrentChange">
				</el-pagination>
			</el-col>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: 'view-main-member',
		data() {
			return {
				memberData: [],
				memberSumData: [],
				memberPageTotal: 0,
				memberPageSize: 10,
				memberPageCurrent: 1,
				onlyOnline: true
			}
		},
		mounted() {
			this.getMember();
		},
		methods: {
			getMember() {
				this.$axios
					.get("/api/pokemon/member/page/" + this.memberPageCurrent + "-" + this.memberPageSize, {
						params: {
							containLeave: !this.onlyOnline
						}
					})
					.then(res => {
						this.memberData = res.data.data.records;
						this.memberPageTotal = res.data.data.total;
						this.memberPageCurrent = res.data.data.current;
						this.memberPageSize = res.data.data.size;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			memberCurrentChange(val) {
				this.memberPageCurrent = val;
				this.getMember();
			},
			memberSizeChange(val) {
				this.memberPageSize = val;
				this.memberPageCurrent = 1;
				this.getMember();
			},
			onlyOnlineChange() {
				this.getMember();
			}
		}
	}
</script>

<style>
</style>
