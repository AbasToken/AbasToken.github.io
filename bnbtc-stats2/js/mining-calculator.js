mining_calculator_app = new Vue({
  el: '#editor',
  data: {
    hashrate: '100',
    units: '1e6',
    difficulty: '0',
    poolfee: '10',
    mint_failure_rate: '3',
    current_difficulty: '0',
    next_difficulty: '0',
    block_reward: '0',
  },
  computed: {
    calculatedTokensPerDay: function () {
      let unitless_hashrate = (this.hashrate * this.units) * (1-(this.mint_failure_rate/100));
      // console.log(unitless_hashrate + 'H/s, diff:' + this.difficulty);
      // console.log('cur reward ' + this.block_reward);
      // console.log('cur diff ' + this.current_difficulty);
      // console.log('nex diff ' + this.next_difficulty);

      // 0.8 is a fudge-factor based on feedback from users. Need to find a better adjustment factor
      return 1 * (1-(this.poolfee/100)) * 86400 * this.block_reward * unitless_hashrate / ((2**32) * this.difficulty);
    },
    calculatedSoloTimePerBlock: function () {
      let unitless_hashrate = (this.hashrate * this.units) * (1-(this.mint_failure_rate/100));

      let seconds = ((2**32) * this.difficulty) / unitless_hashrate;
	console.log("SECONDS: ", seconds);
	if(seconds < 1500){
		seconds = seconds * 1.6;
	}else if(seconds < 3000){
	seconds = seconds * 0.4;
	}else{
	seconds = seconds * 0.9;
	}
      // 1.2 is a fudge-factor based on feedback from users. Need to find a better adjustment factor
      return secondsToReadableTime(1.0 *seconds);
    },
    calculatedSoloTimePerTenBlocks: function () {
      let unitless_hashrate = (this.hashrate * this.units) * (1-(this.mint_failure_rate/100));

      let seconds = 10 * ((2**32) * this.difficulty) / unitless_hashrate;
	if(seconds < 1500){
		seconds = seconds * 1.6;
	}else if(seconds < 3000){
	seconds = seconds * 0.4;
	}else{
	seconds = seconds * 0.9;
	}
      // 1.2 is a fudge-factor based on feedback from users. Need to find a better adjustment factor
      return secondsToReadableTime(1.0 *seconds);
    },
  },
  methods: {
    //update: $.debounce( 250, text_2 ),
    updateHashrate: _.debounce(function (e) {
      this.hashrate = e.target.value
    }, 300),
    updateUnits: function (e) {
      this.units = e.target.value
    },
    updateDifficulty: _.debounce(function (e) {
      this.difficulty = e.target.value
    }, 300),
    updatePoolFee: _.debounce(function (e) {
      this.poolfee = e.target.value
    }, 300),
    updateMintFailureRate: _.debounce(function (e) {
      this.mint_failure_rate = e.target.value
    }, 300),

    useCurrentDiff: function (difficulty) {
      this.difficulty = this.current_difficulty;
    },
    useNextDiff: function (difficulty) {
      this.difficulty = this.next_difficulty;
    },

    setCurrentDifficulty: function (difficulty) {
      this.current_difficulty = difficulty;
    },

    setNextDifficulty: function (difficulty) {
      this.next_difficulty = difficulty;
    },

    setBlockReward: function (block_reward) {
      this.block_reward = block_reward;
    },

    setDifficulty: function (difficulty) {
      this.difficulty = difficulty;
    },
  }
})
