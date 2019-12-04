<template>
	<div id="view-main-contribution">
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
	</div>
</template>

<script>
	export default {
		name: 'view-main-contribution',
		data() {
			return {
				contributionData: []
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
		},
		methods: {
			getContribution() {
				this.$axios
					.get("/api/pokemon/contribution/list")
					.then(res => {
						this.contributionData = res.data.data;
					})
					.catch(function(error) {
						alert("error: " + error);
					});
			},
		}
	}
</script>

<style>
	.pokemon-main-contribution-more {
		position: relative;
		left: 10px;
	}
</style>
