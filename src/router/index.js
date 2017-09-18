import Vue from 'vue';
import Router from 'vue-router';
import index from '../components/Index/Index';
import question from '../components/Question/Question';
import results from '../components/Results/Results';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/question',
      name: 'question',
      component: question
    },
    {
      path: '/results',
      name: 'results',
      component: results
    }
  ]
});
