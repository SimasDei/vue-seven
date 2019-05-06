import Vue from 'vue';
import * as Firebase from 'firebase';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { store } from './store/index';
import DateFilter from './filters/date';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    Firebase.initializeApp({
      apiKey: 'AIzaSyBS_v10OY91GZU2m9XCvvZFnZR25oWuc78',
      authDomain: 'vue-seven.firebaseapp.com',
      databaseURL: 'https://vue-seven.firebaseio.com',
      projectId: 'vue-seven',
      storageBucket: 'vue-seven.appspot.com',
      messagingSenderId: '189767313248',
      appId: '1:189767313248:web:a0570087f1b093fd',
    });
  },
}).$mount('#app');
