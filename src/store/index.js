import Vue from 'vue';
import Vuex from 'vuex';
import * as Firebase from 'firebase';

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
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      Firebase.database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
            });
            commit('setLoadedMeetups', meetups);
            commit('setLoading', false);
          }
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    createMeetup({ commit }, payload) {
      const { title, location, imageUrl, description, date } = payload;
      const meetup = {
        title,
        location,
        imageUrl,
        description,
        date,
      };
      Firebase.database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          const key = data.key;
          console.log(data);
          commit('createMeetup', { ...meetup, id: key });
        })
        .catch(error => {
          console.log(error);
        });
      /**
       * @todo - send meetup data to firebase
       */
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      Firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      Firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
      });
    },
    logout({ commit }) {
      Firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
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
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
