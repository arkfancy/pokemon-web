<template>
	<div id="pokemonAdmin">
		<el-tabs v-model="activeTabs">
			<el-tab-pane label="贡献" name="contribution">
				<el-container>
					<el-aside width="200px">
						<el-menu :default-active="contributionMenuActive" class="el-menu-vertical" :collapse="menuCollapse" @select="contributionMenuSelect"
						 ref="contributionMenu">
							<el-menu-item index="collapse">
								<i class="el-icon-arrow-left" v-show="!menuCollapse"></i>
								<i class="el-icon-arrow-right" v-show="menuCollapse"></i>
								<span slot="title">收缩</span>
							</el-menu-item>
							<el-menu-item index="add">
								<i class="el-icon-document-add"></i>
								<span slot="title">记录贡献</span>
							</el-menu-item>
						</el-menu>
					</el-aside>
					<el-main>
						<el-row v-show="contributionMenuActive=='add'">
							<el-col>
								<h2>记录贡献</h2>
							</el-col>
							<el-col>
								<br>
								<el-table :data="contributionTableData" border>
									<el-table-column prop="preContribution" :label="contributionPreRecordDate" align="right">
									</el-table-column>
									<el-table-column prop="memberName" label="成员" align="center">
									</el-table-column>
									<el-table-column prop="contribution" label="本轮贡献">
										<template slot="header" slot-scope="scope">
											<el-date-picker size="mini" v-model="contributionDate" @change="contributionRecordDateChange" type="date"
											 placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</template>
										<template slot-scope="scope">
											<el-input size="mini" type="number" placeholder="本轮贡献值" v-model="scope.row.contribution" />
										</template>
									</el-table-column>
								</el-table>
								<br>
							</el-col>
							<el-col>
								<el-button @click="submitContribution">提交</el-button>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
			</el-tab-pane>
			<el-tab-pane label="仓库" name="distribution">
			</el-tab-pane>
			<el-tab-pane label="成员" name="member">
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'pokemonAdmin',
		data() {
			return {
				activeTabs: "contribution",
				menuCollapse: true,

				contributionMenuActive: "add",
				contributionDate: "",
				contributionTableData: [],
				contributionPreRecordDate: ""
			}
		},
		methods: {
			contributionMenuSelect(index, indexPath) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.contributionMenu.activeIndex = this.contributionMenuActive;
					return;
				}
				this.contributionMenuActive = index;
				if (this.contributionMenuActive == "add") {
					this.getContribution();
					return;
				}
			},
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
				if (this.contributionDate == null) {
					alert("请选择记录日期。");
					return;
				}
				this.$axios.post("/pokemon/contribution/list", this.contributionTableData).then(
					res => {
						if (res.data.data && res.data.data[0].id != null) {
							alert("记录成功，请返回看板查看");
						}
					}
				)
			}
		},
		mounted() {
			this.contributionMenuSelect("add", "add");
		}
	}
</script>

<style>
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
