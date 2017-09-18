<template>
	<transition name="slide-q" mode="in-out">
		<div class="question">
			<div class="question-detail"><span class="index">{{currentIndex + 1}}</span>{{formula | formatFormula}}</div>
			<input type="text" class="text" v-model="input" ref="input">
			<div class="btn-next btn" @click="next()" v-show="!over">→</div>
			<div class="btn-over btn" @click="lastQue()" v-show="over"><router-link to="/results">R</router-link></div>
			<div class="time">{{currentTime}}</div>
		</div>
	</transition>
</template>

<script>
export default {
	data () {
		return {
			// 当前题目编号
			currentIndex: 0,
			// 存放公式的对象
			formula: {},
			// 存放所有公式
			formulas: [],
			// 用户输入
			input: '',
			// 存放用户输入
			inputs: [],
			// 存放正确答案
			correctAnswers: [],
			// 存放答题对错
			iscorrects: [],
			// 题目数量
			queNum: 10,
			// 时间
			currentTime: '',
			// 时间戳
			time: 0,
			// setInterval
			t: -1,
			// 做完题目转换按钮
			over: false
		};
	},
	created () {
		this.formula = this._updateFormula();
		this._setTime();
	},
	mounted () {
		this.$refs.input.focus();
	},
	destroyed () {
		clearInterval(this.t);
	},
	filters: {
		formatFormula (val) {
			return val.firstNum + ' ' + val.type + ' ' + val.secondNum + ' = ?';
		}
	},
	methods: {
		_setTime () {
			let hours = 0;
			let minutes = 0;
			let seconds = 0;
			let hoursStr = '00';
			let minutesStr = '00';
			let secondsStr = '00';
			this.currentTime = '00:00:00';
			this.t = setInterval(() => {
				this.time++;
				seconds++;
				if (seconds > 59) {
					minutes++;
					seconds = 0;
				}
				if (minutes > 59) {
					hours++;
					minutes = 0;
				}
				if (seconds < 10) {
					secondsStr = '0' + seconds;
				} else {
					secondsStr = '' + seconds;
				}
				if (minutes < 10) {
					minutesStr = '0' + minutes;
				} else {
					minutesStr = '' + minutes;
				}
				if (hours < 10) {
					hoursStr = '0' + hours;
				} else {
					hoursStr = '' + hours;
				}
				this.currentTime = hoursStr + ':' + minutesStr + ':' + secondsStr;
			}, 1000);
		},
		_updateFormula () {
			const types = ['+', '-'];
			let obj = {};
			obj.firstNum = Math.ceil(Math.random() * 30);
			obj.secondNum = Math.ceil(Math.random() * 30);
			obj.type = types[Math.floor(Math.random() * 2)];
			return obj;
		},
		_caculate () {
			this.formulas.forEach((val, index) => {
				let answer = -1;
				if (val.type === '+') {
					answer = val.firstNum + val.secondNum;
					this.iscorrects.push(answer === parseInt(this.inputs[index]));
				} else {
					answer = val.firstNum - val.secondNum;
					this.iscorrects.push(answer === parseInt(this.inputs[index]));
				}
				this.correctAnswers.push(answer);
			});
			let results = [];
			this.iscorrects.forEach((val, index) => {
				let obj = {};
				obj.iscorrect = val;
				obj.input = this.inputs[index];
				obj.formula = this.formulas[index];
				obj.correctAnswer = this.correctAnswers[index];
				results.push(obj);
			});
			this.$store.commit('setResults', results);
		},
		next () {
			this.$refs.input.focus();
			this.inputs.push(this.input);
			this.formulas.push(this.formula);
			this.input = '';
			if (this.currentIndex === this.queNum - 2) {
				this.over = true;
			}
			this.currentIndex++;
			this.formula = this._updateFormula();
		},
		lastQue () {
			this.inputs.push(this.input);
			this.formulas.push(this.formula);
			this.input = '';
			this._caculate();
		}
	}
};
</script>

<style lang="stylus" scoped>
.slide-q-enter-active, .slide-q-leave-active
	transition: all .3s
.slide-q-enter, .slide-q-leave-to
	transform: translate3d(100%, 0, 0)
.question
	position: absolute
	top: 0
	right: 0
	height: 100%
	width: 100%
	background-color: #dfdfdf
	.question-detail
		line-height: 40px
		margin-top: 20%
		margin-left: 15%
		text-align: left
		font-size: 30px
		font-weight: 300
		.index
			display: inline-block
			width: 30px
			height: 30px
			margin-top: -4px
			margin-right: 20px
			padding: 10px
			vertical-align: middle
			text-align: center
			line-height: 30px
			color: #fff
			border-radius: 50%
			background-color: #007ACC
	.text
		width: 200px
		padding: 10px 20px
		margin: 40px 0 0 15%
		border: 1px solid #ddd
		border-radius: 6px
		font-size: 25px
		outline: none
		transiton: all 0.3s
		font-weight: 200
		&:focus
			box-shadow: 0 0 16px 0 #00afff
	.btn
		display: inline-block
		margin-left: 4px
		margin-top: -10px
		width: 50px
		height: 50px
		line-height: 46px
		text-align: center
		color: #fff
		font-weight: 700
		font-size: 23px
		border-radius: 50%
	.btn-next
		background-color: #007ACC
	.btn-over
		background-color: #DE5246
		a
			text-decoration: none 
			color: #fff
	.time
		margin-top: 26px
		text-align: center
		font-size: 20px
		font-weight: 300
</style>
