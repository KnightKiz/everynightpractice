import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
		results: []
  },
  mutations: {
    setResults (state, results) {
      state.results = results;
		}
  }
});

export default store;
