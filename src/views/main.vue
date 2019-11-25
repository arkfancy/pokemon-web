<template>
	<div id="pokemonMain">
		<el-tabs v-model="activeTabs">
			<el-tab-pane label="贡献" name="contribution">
				<el-col :xs="24" :sm="10" :md="10" :lg="8">
					<el-col>
						<h3>贡献榜</h3>
					</el-col>
					<el-col :span="22" :offset="1" align="right">
						<span style="font-size: 14px;">最近更新日期：{{contributionDate}}</span>
					</el-col>
					<el-col :span="22" :offset="1">
						<el-table :data="contributionData">
							<el-table-column type="index" />
							<el-table-column label="成员" prop="memberName" />
							<el-table-column label="贡献" prop="contribution" />
						</el-table>
					</el-col>
				</el-col>
			</el-tab-pane>
			<el-tab-pane label="仓库" name="distribution">
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
						<el-col align="left" style="margin-bottom: 10px;">当前计算公式：3 * √总贡献量 + (本轮贡献量 - 上轮贡献量)
						</el-col>
						<el-col>
							<el-form :inline="true" :model="distributionCalculateForm" size="mini" align="left">
								<!-- <el-form-item label="计算方式">
									<el-input v-model="distributionCalculateForm.strategy" placeholder="计算方式"></el-input>
								</el-form-item> -->
								<el-form-item label="本轮分配日期">
									<!-- <el-select v-model="distributionCalculateForm.currentDate" placeholder="本轮日期">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select> -->
									<el-date-picker size="mini" v-model="distributionCalculateForm.currentDate" type="date" placeholder="选择日期"
									 value-format="yyyy-MM-dd" style="max-width: 150px;" />
								</el-form-item>
								<el-form-item label="上轮分配日期">
									<!-- <el-select v-model="distributionCalculateForm.previousDate" placeholder="上轮日期">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select> -->
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
							<!-- <el-col>
									计算公式：<el-select size="mini"></el-select>
								</el-col>
								本轮日期：<el-select size="mini"></el-select>
								上轮日期：<el-select size="mini"></el-select> -->
						</el-col>
						<el-col>
							<el-table :data="distributionCalculateData">
								<el-table-column label="成员" prop="memberName" />
								<el-table-column label="本轮贡献" prop="currentContribution" />
								<el-table-column label="上轮贡献" prop="previousContribution" />
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
			</el-tab-pane>
			<el-tab-pane label="成员" name="member">
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
							<el-table-column label="加入日期" prop="joinDate" />
						</el-table>
						<el-pagination layout="sizes, prev, pager, next" :total="memberPageTotal" :page-size="memberPageSize"
						 :current-page="memberPageCurrent" @size-change="memberSizeChange" @current-change="memberCurrentChange">
						</el-pagination>
					</el-col>
				</el-col>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'pokemonMain',
		data() {
			return {
				activeTabs: "contribution",

				contributionData: [],

				distributionData: [],
				distributionSumData: [],
				distributionCalculateData: [],
				distributionPageTotal: 0,
				distributionPageSize: 10,
				distributionPageCurrent: 1,
				itemData: [],
				itemId: "",
				distributionCalculateForm: {

				},

				memberData: [],
				memberSumData: [],
				memberPageTotal: 0,
				memberPageSize: 10,
				memberPageCurrent: 1,
				onlyOnline: true
			}
		},
		computed: {
			contributionDate() {
				if (this.contributionData != null && this.contributionData.length > 0) {
					return this.contributionData[0].recordDate;
				}
				return "";
			}
		},
		mounted() {
			this.getContribution();
			this.getDistribution();
			this.getDistributionSum();
			this.getMember();
			this.getItem();
		},
		methods: {
			getContribution() {
				this.$axios
					.get("/pokemon/contribution/list")
					.then(res => {
						this.contributionData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
			getDistribution() {
				this.$axios
					.get("/pokemon/warehouse-distribution/page/" + this.distributionPageCurrent + "-" + this.distributionPageSize)
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
					.get("/pokemon/warehouse-distribution/sum", {
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
			getMember() {
				this.$axios
					.get("/pokemon/member/page/" + this.memberPageCurrent + "-" + this.memberPageSize, {
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
					.get("/pokemon/contribution/list", {
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
							.get("/pokemon/contribution/list", {
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
								}
								//计算
								var sum = 0;
								for (let index in tempData) {
									let calculateContribution = parseInt(tempData[index].currentContribution - tempData[index].previousContribution +
										3 * Math.sqrt(tempData[index].currentContribution));
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
	.pokemon-main-contribution-more {
		position: relative;
		left: 10px;
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
