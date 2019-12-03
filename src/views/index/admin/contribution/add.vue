<template>
	<div id="view-admin-contribution-add">
		<el-col>
			<h2>记录贡献</h2>
		</el-col>
		<el-col>
			<br>
			<el-table :data="contributionTableData" border>
				<el-table-column prop="preContribution" :label="contributionPreRecordDate" align="right" />
				<el-table-column prop="memberName" label="成员" align="center" />
				<el-table-column>
					<template slot="header" slot-scope="scope">{{scope.row}}
						<el-date-picker style="line-height: 0px;padding: 0px" size="mini" v-model="contributionDate" @change="contributionRecordDateChange"
						 type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
					</template>
					<template slot-scope="scope">
						<el-input size="mini" type="number" placeholder="本轮贡献值" v-model="scope.row.contribution" clearable />
					</template>
				</el-table-column>
			</el-table>
			<br>
		</el-col>
		<el-col>
			<el-button @click="submitContribution">提交</el-button>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: 'view-admin-contribution-add',
		data() {
			return {
				contributionTableData: [],
				contributionDate: "",
				contributionPreRecordDate: "",
			}
		},
		mounted() {
			this.getContribution();
		},
		methods: {
			getContribution() {
				this.$axios
					.get("/pokemon/contribution/list")
					.then(res => {
						this.contributionTableData = res.data.data;
						this.contributionPreRecordDate = res.data.data[0].recordDate
						for (let index in this.contributionTableData) {
							this.contributionTableData[index].preContribution = this.contributionTableData[index].contribution;
						}
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			contributionRecordDateChange(val) {
				for (let index in this.contributionTableData) {
					this.contributionTableData[index].recordDate = val;
				}
			},
			submitContribution() {
				if (this.contributionDate == null || this.contributionDate == "") {
					alert("请选择记录日期。");
					return;
				}
				this.confirmSubmit(() => {
					this.$axios.post("/pokemon/contribution/list", this.contributionTableData).then(
						res => {
							if (res.data.data && res.data.data[0].id != null) {
								alert("记录成功，请返回看板查看。");
							}
						}
					)
				})
			},
		}
	}
</script>

<style>
</style>
