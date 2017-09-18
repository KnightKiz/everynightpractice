<template>
	<div class="index">
		<div class="btn"><router-link to="/question">开始</router-link></div>
	</div>
</template>

<script>
export default {
	created () {
		this.$root.eventHub.$on('close', () => {
			this.questions = false;
		});
	},
	methods: {
		showQuestions () {
			this.questions = true;
		}
	}
};
</script>

<style lang="stylus" scoped>
.index
	position: absolute
	left: 0
	top: 0
	height: 100%
	width: 100%
	.btn
		user-select: none
		cursor: pointer
		position absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		display: block
		width: 200px
		height: 100px
		line-height: 100px
		text-align: center
		margin: auto
		border: 1px dashed #999
		border-radius: 10px;
		font-size: 36px
		a
			text-decoration: none
			color: #000 
</style>
