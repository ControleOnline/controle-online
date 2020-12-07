import Vue              from "vue";
import Vuex             from "vuex";

import auth             from "./modules/auth";
import gmaps            from "./modules/gmaps";
import quote            from "./modules/quote";
import people           from "./modules/people";
import config           from "./modules/config";
import salesOrder       from "./modules/order/sales";
import purchasingOrder  from "./modules/order/purchasing";
import comissionOrder   from "./modules/order/comission";
import receiveInvoice   from "./modules/invoice/receive";
import comissionInvoice from "./modules/invoice/comission";
import payInvoice       from "./modules/invoice/pay";
import profile          from "./modules/profile";
import support          from "./modules/support";
import user             from "./modules/user";
import dashboard        from "./modules/dashboard";
import client           from "./modules/client";
import contracts        from "./modules/contracts";
import particulars      from "./modules/particulars";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      gmaps,
      quote,
      people,
      config,
      salesOrder,
      purchasingOrder,
      comissionOrder,
      receiveInvoice,
      comissionInvoice,
      payInvoice,
      profile,
      support,
      user,
      dashboard,
      client,
      contracts,
      particulars,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
