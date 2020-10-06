import Vue    from 'vue';
import Vuex   from 'vuex';

import auth    from './modules/auth' ;
import gmaps   from './modules/gmaps';
import quote   from './modules/quote';
import people  from './modules/people';
import config  from './modules/config';
import order   from './modules/order';
import invoice from './modules/invoice';
import profile from './modules/profile';
import support from './modules/support';
import user    from './modules/user';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth   ,
      gmaps  , 
      quote  ,
      people ,
      config ,
      order  ,
      invoice,
      profile,
      support,
      user   ,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
