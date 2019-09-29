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
							<el-table-column label="分配总量" prop="sum" />
						</el-table>
					</el-col>
				</el-col>
				<el-col :xs="24" :sm="14" :md="14" :lg="16">
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
				distributionPageTotal: 0,
				distributionPageSize: 10,
				distributionPageCurrent: 1,

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
					.get("/pokemon/warehouse-distribution/sum")
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
			distributionCurrentChange(val) {
				this.distributionPageCurrent = val;
				this.getDistribution();
			},
			distributionSizeChange(val) {
				this.distributionPageSize = val;
				this.distributionPageCurrent = 1;
				this.getDistribution();
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
	.pokemon-main-contribution-more {
		position: relative;
		left: 10px;
	}
</style>
