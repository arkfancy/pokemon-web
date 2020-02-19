<template>
	<div id="view-main-distribution">
		<el-col :xs="24" :sm="10" :md="10" :lg="8">
			<el-col>
				<h3>累计分配记录</h3>
			</el-col>
			<el-col :span="22" :offset="1">
				<el-table :data="distributionSumData">
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left">
								<el-form-item :label="item.itemName" v-for="(item,index) in props.row.list" :key="index">
									<span>{{ item.quantity }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column label="成员" prop="memberName" />
					<!-- <el-table-column label="分配数量" prop="sum" /> -->
					<el-table-column prop="sum">
						<template slot="header" slot-scope="scope">
							<div id="distribution-header-template">
								{{scope.row}}
								<el-col>
									<el-select v-model="itemId" placeholder="选择道具" size="mini" @change="distributionItemIdChange" filterable
									 clearable>
										<el-option v-for="item in itemData" :key="item.itemId" :label="item.itemName" :value="item.itemId" />
									</el-select>
								</el-col>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-col>
		<el-col :xs="24" :sm="14" :md="14" :lg="16">
			<el-col :span="24">
				<el-col>
					<h3>分配计算</h3>
				</el-col>
				<el-col align="left" style="margin-bottom: 10px;">当前计算公式：本轮贡献差/2 + 副本贡献量 * 100 + 会战加成 + 活跃加成
				</el-col>
				<el-col>
					<el-form :inline="true" :model="distributionCalculateForm" size="mini" align="left">
						<el-form-item label="本轮分配日期">
							<el-date-picker size="mini" v-model="distributionCalculateForm.currentDate" type="date" placeholder="选择日期"
							 value-format="yyyy-MM-dd" style="max-width: 150px;" />
						</el-form-item>
						<el-form-item label="上轮分配日期">
							<el-date-picker size="mini" v-model="distributionCalculateForm.previousDate" type="date" placeholder="选择日期"
							 value-format="yyyy-MM-dd" style="max-width: 150px;" />
						</el-form-item>
						<el-form-item label="待分配数量">
							<el-input type="number" v-model="distributionCalculateForm.quantity" placeholder="总数" style="max-width: 110px;"
							 clearable="" />
						</el-form-item>
						<el-form-item>
							<el-button @click="distributionCalculate">计算分配</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col>
					<el-table :data="distributionCalculateData">
						<el-table-column label="成员" prop="memberName" />
						<el-table-column label="本轮贡献差" prop="contribution" />
						<el-table-column label="副本贡献" prop="dungeonContribution" />
						<el-table-column label="会战加成" prop="battleBonus" />
						<el-table-column label="活跃加成" prop="activityBonus" />
						<el-table-column label="计算值" prop="calculateContribution" />
						<el-table-column label="贡献占比" prop="contributionPercentStr" />
						<el-table-column label="分配数量" prop="quantity" />
					</el-table>
				</el-col>
			</el-col>
			<el-col :span="24">
				<el-col>
					<h3>分配详细记录</h3>
				</el-col>
				<el-col :span="22" :ofset="1">
					<el-table :data="distributionData">
						<el-table-column label="分配日期" prop="recordDate" />
						<el-table-column label="成员" prop="memberName" />
						<el-table-column label="分配物品" prop="itemName" />
						<el-table-column label="数量" prop="quantity" />
					</el-table>
					<el-pagination layout="sizes, prev, pager, next" :total="distributionPageTotal" :page-size="distributionPageSize"
					 :current-page="distributionPageCurrent" @size-change="distributionSizeChange" @current-change="distributionCurrentChange">
					</el-pagination>
				</el-col>
			</el-col>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: 'view-main-distribution',
		data() {
			return {
				distributionData: [],
				distributionSumData: [],
				distributionCalculateData: [],
				distributionPageTotal: 0,
				distributionPageSize: 10,
				distributionPageCurrent: 1,
				itemData: [],
				itemId: "",
				distributionCalculateForm: {},
			}
		},
		mounted() {
			this.getDistribution();
			this.getDistributionSum();
			this.getItem();
		},
		methods: {
			getDistribution() {
				this.$axios
					.get("/api/pokemon/warehouse-distribution/page/" + this.distributionPageCurrent + "-" + this.distributionPageSize)
					.then(res => {
						this.distributionData = res.data.data.records;
						this.distributionPageTotal = res.data.data.total;
						this.distributionPageCurrent = res.data.data.current;
						this.distributionPageSize = res.data.data.size;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			getDistributionSum() {
				this.$axios
					.get("/api/pokemon/warehouse-distribution/sum", {
						params: {
							itemId: this.itemId
						}
					})
					.then(res => {
						this.distributionSumData = res.data.data;
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
			distributionCurrentChange(val) {
				this.distributionPageCurrent = val;
				this.getDistribution();
			},
			distributionSizeChange(val) {
				this.distributionPageSize = val;
				this.distributionPageCurrent = 1;
				this.getDistribution();
			},
			distributionItemIdChange(val) {
				this.getDistributionSum();
			},
			distributionCalculate() {
				let currentDate = this.distributionCalculateForm.currentDate;
				let previousDate = this.distributionCalculateForm.previousDate;
				let quantity = this.distributionCalculateForm.quantity;
				if (currentDate == null || previousDate == null || quantity == null || quantity == '') {
					alert("请完善计算条件。");
					return;
				}
				//查询两轮贡献
				let tempData = [];
				this.$axios
					.get("/api/pokemon/contribution/list", {
						params: {
							recordDate: currentDate
						}
					})
					.then(res => {
						tempData = res.data.data;
						for (let index in tempData) {
							tempData[index].currentContribution = tempData[index].contribution;
						}
						this.$axios
							.get("/api/pokemon/contribution/list", {
								params: {
									recordDate: previousDate
								}
							})
							.then(res => {
								for (let index in tempData) {
									let memberId = tempData[index].memberId;
									for (let idx in res.data.data) {
										if (memberId == res.data.data[idx].memberId) {
											tempData[index].previousContribution = res.data.data[idx].contribution;
										}
									}
									if (tempData[index].previousContribution == null) {
										tempData[index].previousContribution = 0;
									}
									tempData[index].contribution = tempData[index].currentContribution - tempData[index].previousContribution;
								}
								//查询两轮间副本贡献量
								this.$axios.get("/api/pokemon/dungeon/sum", {
									params: {
										previousDate: previousDate,
										currentDate: currentDate
									}
								}).then(res => {
									for (let index in tempData) {
										let memberId = tempData[index].memberId;
										let memberName = tempData[index].memberName;
										for (let idx in res.data.data) {
											if (memberId == res.data.data[idx].memberId) {
												tempData[index].dungeonContribution = res.data.data[idx].dungeonContribution;
											}
										}
										if (tempData[index].dungeonContribution == null) {
											tempData[index].dungeonContribution = 0;
										}
										//会战系数TODO
										switch (memberName) {
											case "闲暇人士":
												tempData[index].battleBonus =  30000 * 3 + 10000 * 1;
												break;
											case "ArkL":
												tempData[index].battleBonus = 30000 * 4 + 10000 * 4;
												break;
											case "半梦半醒":
												tempData[index].battleBonus = 30000 * 1 + 10000 * 4;
												break;
											case "卡西里摩根":
												tempData[index].battleBonus = 30000 * 2 + 10000 * 4;
												break;
											case "跳跳":
												tempData[index].battleBonus = 30000 * 1 + 10000 * 1;
												break;
											case "幽默词籁瑞":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 2;
												break;
											case "塞尔达":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 1;
												break;
											case "拜伦无情":
												tempData[index].battleBonus = 30000 * 1 + 10000 * 4;
												break;
											case "釢茶":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 2;
												break;
											case "心心メ大魔王":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 2;
												break;
											case "苏念":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 3;
												break;
											case "天问":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 4;
												break;
											case "兔七哥":
												tempData[index].battleBonus = 30000 * 3 + 10000 * 2;
												break;
											case "冰雪兔":
												tempData[index].battleBonus = 30000 * 0 + 10000 * 4;
												break;
											default:
												tempData[index].battleBonus = 0;
												break;
										}
									}
									//活跃加成
									this.$axios
										.get("/api/pokemon/member/list")
										.then(res => {
											for (let index in tempData) {
												let memberId = tempData[index].memberId;
												for (let idx in res.data.data) {
													if (memberId == res.data.data[idx].memberId) {
														if (res.data.data[idx].rankId == 1) {
															tempData[index].activityBonus = 50000;
														} else if (res.data.data[idx].rankId == 2) {
															tempData[index].activityBonus = 40000;
														} else if (res.data.data[idx].rankId == 3) {
															tempData[index].activityBonus = 30000;
														} else{
															tempData[index].activityBonus = 10000;
														}
													}
												}
												if (tempData[index].activityBonus == null) {
													tempData[index].activityBonus = 0;
												}
											}

											//计算
											var sum = 0;
											for (let index in tempData) {
												let calculateContribution = parseInt((tempData[index].currentContribution - tempData[index].previousContribution) /
													2 +
													tempData[index].dungeonContribution * 100 +
													tempData[index].battleBonus +
													tempData[index].activityBonus);
												tempData[index].calculateContribution = calculateContribution;
												sum += calculateContribution;
											}
											for (let index in tempData) {
												let contributionPercent = Math.floor(tempData[index].calculateContribution * 10000 / sum) / 10000;
												tempData[index].contributionPercent = contributionPercent;
												tempData[index].contributionPercentStr = (100 * contributionPercent).toFixed(2) + '%';
												tempData[index].quantity = Math.floor(quantity * contributionPercent);
											}
											this.distributionCalculateData = tempData;
										});
								}).catch(function(error) {
									alert("error: " + error);
								});
							})
							.catch(function(error) {
								alert("error: " + error);
							});
					})
					.catch(function(error) {
						alert("error: " + error);
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
