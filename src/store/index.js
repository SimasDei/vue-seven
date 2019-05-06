import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: '1',
        title: 'Meetup in New York',
        location: 'New York',
        description: 'Developers meetup',
        date: '2019-06-01T12:00',
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Seattle_Kerry_Park_Skyline.jpg',
        id: '2',
        title: 'Meetup in Seattle',
        location: 'Seattle',
        description: 'Developers meetup',
        date: '2019-06-03T12:00',
      },
      {
        imageUrl: 'https://live.staticflickr.com/7547/27686161020_aa471b5e88_b.jpg',
        id: '3',
        title: 'Meetup in Barcelona',
        location: 'Barcelona',
        description: 'Developers meetup',
        date: '2019-05-05T12:00',
      },
    ],
    user: {
      id: '1',
      registeredMeetups: ['1'],
    },
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const { title, location, imageUrl, description, date } = payload;
      const meetup = {
        title,
        location,
        imageUrl,
        description,
        date,
        id: '4',
      };
      /**
       * @todo - send meetup data to firebase
       */
      commit('createMeetup', meetup);
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => meetup.id === meetupId);
      };
    },
  },
});
