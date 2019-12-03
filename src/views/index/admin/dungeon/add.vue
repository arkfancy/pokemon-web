<template>
	<div id="view-admin-dungeon-add">
		<el-col>
			<h2>记录副本</h2>
		</el-col>
		<el-col>
			<br>

			<el-table :data="dungeonTableData" border>
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
						<el-date-picker style="line-height: 0px;padding: 0px" size="mini" v-model="dungeonDate" @change="dungeonRecordDateChange"
						 type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
					</template>
					<template slot-scope="scope">
						<el-input size="mini" type="number" placeholder="副本贡献" v-model="scope.row.dungeonContribution" clearable />
					</template>
				</el-table-column>
				<el-table-column align="center">
					<template slot="header" slot-scope="scope">{{scope.row}}
						<el-button size="mini" @click="addDungeonTableRow()">添加</el-button>
					</template>
					<template slot-scope="scope">
						<el-button size="mini" @click="deleteDungeonTableRow(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br>
		</el-col>
		<el-col>
			<el-button @click="submitDungeon">提交</el-button>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: 'view-admin-dungeon-add',
		data() {
			return {
				dungeonTableData: [{}],
				dungeonDate: "",

				memberData: []
			}
		},
		mounted() {
			this.getMember();
		},
		methods: {
			getMember() {
				this.$axios
					.get("/pokemon/member/list")
					.then(res => {
						this.memberData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			dungeonRecordDateChange(val) {
				for (let index in this.dungeonTableData) {
					this.dungeonTableData[index].recordDate = val;
				}
			},
			addDungeonTableRow() {
				this.dungeonTableData.push({
					recordDate: this.dungeonDate
				});
			},
			deleteDungeonTableRow(index) {
				this.dungeonTableData.splice(index, 1);
			},
			submitDungeon() {
				if (this.dungeonDate == null || this.dungeonDate == "") {
					alert("请选择记录日期。");
					return;
				}
				this.confirmSubmit(() => {
					this.$axios.post("/pokemon/dungeon/list", this.dungeonTableData).then(
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
