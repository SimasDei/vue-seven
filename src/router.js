import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

import Meetups from '@/components/Meetup/Meetups';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import Profile from '@/components/User/Profile';
import SignIn from '@/components/User/SignIn';
import SignUp from '@/components/User/SignUp';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});
