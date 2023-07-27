import Vue from "vue";
import Vuex from "vuex";
import auth from "@controleonline/quasar-login-ui/src/store/modules/auth";
import shop from "@controleonline/quasar-shop-ui/src/store/modules/shop";
import quote from "@controleonline/quasar-quote-ui/src/store/modules/quote";
import coupon from "@controleonline/quasar-coupon-ui/src/store/coupon";
import salesOrder from "@controleonline/quasar-orders-ui/src/store/modules/order/sales";
import purchasingOrder from "@controleonline/quasar-orders-ui/src/store/modules/order/purchasing";
import comissionOrder from "@controleonline/quasar-orders-ui/src/store/modules/order/comission";
import dashboard from "@controleonline/quasar-dashboard-ui/src/mixins/dashboard";
import receiveInvoice from "@controleonline/quasar-financial-ui/src/store/modules/invoice/receive";
import comissionInvoice from "@controleonline/quasar-financial-ui/src/store/modules/invoice/comission";
import payInvoice from "@controleonline/quasar-financial-ui/src/store/modules/invoice/pay";
import expense from "@controleonline/quasar-financial-ui/src/store/modules/invoice/expense";
import support from "@controleonline/quasar-support-ui/src/store/support";
import guides from "@controleonline/quasar-guides-ui/src/store/guides";
import categories from "@controleonline/quasar-common-ui/src/store/categories";
import menu from "@controleonline/quasar-common-ui/src/store/menu";
import users from "@controleonline/quasar-common-ui/src/store/users";
import gmaps from "@controleonline/quasar-common-ui/src/store/gmaps";
import people from "@controleonline/quasar-common-ui/src/store/people";
import config from "@controleonline/quasar-common-ui/src/store/config";
import profile from "@controleonline/quasar-common-ui/src/store/profile";
import user from "@controleonline/quasar-common-ui/src/store/user";

Vue.use(Vuex);

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
      auth,
      coupon,
      gmaps,
      people,
      config,
      profile,
      user,
      dashboard,
      quote,
      shop,
      salesOrder,
      purchasingOrder,
      comissionOrder,
      receiveInvoice,
      comissionInvoice,
      payInvoice,
      expense,
      support,
      guides,
      categories,
      menu,
      users,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
