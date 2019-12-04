<template>
	<div id="view-admin-distribution">
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
	</div>
</template>

<script>
	export default {
		name: 'view-admin-distribution',
		data() {
			return {
				menuCollapse: false,
				itemData: [],
				itemId: "",
				distributionMenuActive: "add",
				distributionTableData: [],
				distributionDate: "",
			}
		},
		mounted() {
			this.getItem();
			this.distributionMenuSelect("add");
		},
		methods: {
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
			getDistribution() {
				//分配也是按贡献排名分的
				this.$axios
					.get("/api/pokemon/contribution/list")
					.then(res => {
						this.distributionTableData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			getItem() {
				this.$axios
					.get("/api/pokemon/item/list")
					.then(res => {
						this.itemData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
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
			submitDistribution() {
				this.confirmSubmit(() => {
					this.$axios.post("/api/pokemon/warehouse-distribution/list", this.distributionTableData).then(
						res => {
							if (res.data.data && res.data.data[0].id != null) {
								alert("记录成功，请返回看板查看。");
							}
						}
					)
				});
			}
		}
	}
</script>

<style>
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
