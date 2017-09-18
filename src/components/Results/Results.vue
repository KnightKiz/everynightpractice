<template>
	<div class="results">
		<h1 class="title">
				结果查询
		</h1>
		<ul class="result-list">
			<li class="result-item" v-for="(item, index) in results" :key="index">
				<span class="NO">{{index + 1}}</span>
				<span class="formula">{{formatFormula(item)}}</span>
				<span class="answer">{{item.input}}</span>
				<span class="iscorrect" :class="{'correct': item.iscorrect, 'notcorrect': !item.iscorrect}">{{item.iscorrect | formatCorrect}}</span>
			</li>
		</ul>
		<div class="btn-back"><router-link to="/">←</router-link></div>
		<div class="accuracy">正确率：{{accuracy}}</div>
	</div>
</template>

<script>
export default {
	computed: {
		results () {
			return this.$store.state.results;
		},
		accuracy () {
			let correctCount = 0;
			this.results.forEach(val => {
				if (val.iscorrect) {
					correctCount++;
				}
			});
			return correctCount / this.results.length * 100 + '%';
		}
	},
	methods: {
		formatFormula (item) {
			return item.formula.firstNum + ' ' + item.formula.type + ' ' + item.formula.secondNum + ' = ' + item.correctAnswer;
		}
	},
	filters: {
		formatCorrect (val) {
			return val ? '√' : '×';
		}
	}
};
</script>

<style lang="stylus" scoped>
.results
	position absolute
	top: 0
	left: 0
	height: 100%
	width: 100%
	.title
		margin-top: 20px
		line-height: 50px
		text-align: center
		font-size: 36px
		font-weight: 200
	.result-list
		list-style: none
		width: 100%
		.result-item
			display: flex
			height: 45px
			margin: 0 20px
			padding: 20px 0
			border-bottom: 1px solid #ddd
			font-size: 0
			&:last-child
				border-bottom: none
			span 
				flex: 1 1 auto
				line-height: 45px
				font-weight: 400
				font-size: 20px
			.iscorrect
				font-weight: 700
				font-size: 30px
				&.correct
					color: #0000ff
				&.notcorrect
					color: #ff0000
	.accuracy
		position: relative
		right: 0
		display: inline-block
		vertical-align: middle
		font-size: 30px
		margin: 15px 30px
		text-align: right
	.btn-back
		display: inline-block
		vertical-align: middle
		width: 50px
		height: 50px
		margin: 15px 30px
		line-height: 46px
		text-align: center
		font-weight: 700
		font-size: 25px
		border-radius: 50%
		background-color: #007ACC
		a
			color: #fff
			text-decoration: none
</style>
