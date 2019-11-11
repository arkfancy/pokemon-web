<template>
	<div id="pokemonAdmin">
		<el-tabs v-model="activeTabs" @tab-click="tabChange">
			<el-tab-pane label="贡献" name="contribution">
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
						</el-row>
					</el-main>
				</el-container>
			</el-tab-pane>
			<el-tab-pane label="仓库" name="distribution">
				<el-container>
					<el-aside width="200">
						<el-menu :default-active="distributionMenuActive" class="el-menu-vertical" :collapse="menuCollapse" @select="distributionMenuSelect"
						ref="distributionMenu">
							<el-menu-item index="collapse">
								<i class="el-icon-arrow-left" v-show="!menuCollapse" />
								<i class="el-icon-arrow-right" v-show="menuCollapse" />
								<span slot="title">收缩</span>
							</el-menu-item>
							<el-menu-item index="add">
								<i class="el-icon-document-add" />
								<span slot="title">分配仓库</span>
							</el-menu-item>
						</el-menu>
					</el-aside>
					<el-main>
						<el-row v-show="distributionMenuActive=='add'">
							<el-col>
								<h2>分配仓库</h2>
							</el-col>
							<el-col>
								<br>
								<el-table :data="distributionTableData" border>
									<el-table-column prop="memberName" label="成员" align="center" />
									<el-table-column>
										<template slot="header" slot-scope="scope">
											<div id="distribution-header-template">
												{{scope.row}}
												<el-col>
													<el-date-picker v-model="distributionDate" @change="distributionRecordDateChange" type="date" placeholder="选择日期"
													value-format="yyyy-MM-dd" size="mini" />
												</el-col>
												<el-col>
													<el-select v-model="itemId" placeholder="选择道具" size="mini" @change="distributionItemIdChange" filterable>
														<el-option v-for="item in itemData" :key="item.itemId" :label="item.itemName" :value="item.itemId" />
													</el-select>
												</el-col>
											</div>
										</template>
										<template slot-scope="scope">
											<el-input size="mini" type="number" placeholder="分配数量" v-model="scope.row.quantity" clearable />
										</template>
									</el-table-column>
								</el-table>
								<br>
							</el-col>
							<el-col>
								<el-button @click="submitDistribution">提交</el-button>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
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
				menuCollapse: false,

				contributionMenuActive: "add",
				contributionTableData: [],
				contributionDate: "",
				contributionPreRecordDate: "",

				itemData: [],
				itemId: "",
				distributionMenuActive: "add",
				distributionTableData: [],
				distributionDate: "",
			}
		},
		methods: {
			contributionMenuSelect(index) {
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
			distributionMenuSelect(index) {
				if (index == "collapse") {
					this.menuCollapse = !this.menuCollapse;
					this.$refs.distributionMenu.activeIndex = this.distributionMenuActive;
					return;
				}
				this.distributionMenuActive = index;
				if (this.distributionMenuActive == "add") {
					this.getDistribution();
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
			getDistribution() {
				//分配也是按贡献排名分的
				this.$axios
					.get("/pokemon/contribution/list")
					.then(res => {
						this.distributionTableData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			getItem() {
				this.$axios
					.get("/pokemon/item/list")
					.then(res => {
						this.itemData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			tabChange(tab) {
				this.tabNameChange(tab.name);
			},
			tabNameChange(name) {
				if (name == "contribution") {
					this.contributionMenuSelect("add");
				} else if (name == "distribution") {
					this.distributionMenuSelect("add");
				}
			},
			contributionRecordDateChange(val) {
				for (let index in this.contributionTableData) {
					this.contributionTableData[index].recordDate = val;
				}
			},
			distributionRecordDateChange(val) {
				for (let index in this.distributionTableData) {
					this.distributionTableData[index].recordDate = val;
				}
			},
			distributionItemIdChange(val) {
				for (let index in this.distributionTableData) {
					this.distributionTableData[index].itemId = val;
				}
			},
			confirmSubmit(submit) {
				this.$confirm("确定提交？", "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(res => {
					if (res) {
						submit()
					}
				}).catch(res => {
					alert(res)
				});
			},
			submitContribution() {
				if (this.contributionDate == null) {
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
				});
			},
			submitDistribution() {
				this.confirmSubmit(() => {
					this.$axios.post("/pokemon/warehouse-distribution/list", this.distributionTableData).then(
						res => {
							if (res.data.data && res.data.data[0].id != null) {
								alert("记录成功，请返回看板查看。");
							}
						}
					)
				});
			}
		},
		mounted() {
			this.tabNameChange("contribution");
			this.getItem();
		}
	}
</script>

<style>
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	#distribution-header-template {
		line-height: 0px;
		padding: 0;
	}

	#distribution-header-template .el-col {
		line-height: 0px;
		padding: 0;
	}

	#distribution-header-template .el-date-editor {
		width: auto;
		padding: 0;
	}

	#distribution-header-template .el-select {
		width: auto;
		padding: 0;
	}

	#distribution-header-template .el-input {
		padding: 0;
	}
</style>
