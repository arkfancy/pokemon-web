<template>
	<div id="view-admin-guild-war-add">
		<el-col>
			<h2>记录公会战</h2>
		</el-col>
		<el-col>
			<el-date-picker size="mini" v-model="guildWarDate" @change="guildWarRecordDateChange" type="date" placeholder="选择日期"
			 value-format="yyyy-MM-dd" />
		</el-col>
		<el-col>
			<br>
			<el-table :data="guildWarTableData" border>
				<el-table-column type="index" width="50" />
				<el-table-column label="成员" align="center">
					<template slot-scope="scope">
						<el-select size="mini" v-model="scope.row.memberId" filterable>
							<el-option v-for="item in memberData" :key="item.memberId" :label="item.memberName" :value="item.memberId" />
						</el-select>
					</template>
				</el-table-column>
				<el-table-column align="center">
					<template slot="header" slot-scope="scope">{{scope.row}}
						<el-button size="mini" @click="addguildWarTableRow()">添加</el-button>
					</template>
					<template slot-scope="scope">
						<el-button size="mini" @click="deleteguildWarTableRow(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br>
		</el-col>
		<el-col>
			<el-button @click="submitguildWar">提交</el-button>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: 'view-admin-guildWar-add',
		data() {
			return {
				guildWarTableData: [{}],
				guildWarDate: "",

				memberData: []
			}
		},
		mounted() {
			this.getMember();
		},
		methods: {
			getMember() {
				this.$axios
					.get("/api/pokemon/member/list")
					.then(res => {
						this.memberData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			guildWarRecordDateChange(val) {
				for (let index in this.guildWarTableData) {
					this.guildWarTableData[index].recordDate = val;
				}
			},
			addguildWarTableRow() {
				this.guildWarTableData.push({
					recordDate: this.guildWarDate
				});
			},
			deleteguildWarTableRow(index) {
				this.guildWarTableData.splice(index, 1);
			},
			submitguildWar() {
				if (this.guildWarDate == null || this.guildWarDate == "") {
					alert("请选择记录日期。");
					return;
				}
				this.confirmSubmit(() => {
					this.$axios.post("/api/pokemon/guildWar/list", this.guildWarTableData).then(
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
