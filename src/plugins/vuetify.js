import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.pink.base,
    secondary: colors.blueGrey.base,
    accent: colors.purple.base,
    error: colors.red.base,
    warning: colors.deepOrange.base,
    info: colors.cyan.base,
    success: colors.lightGreen.base,
  },
});
