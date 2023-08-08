import categories from "@controleonline/quasar-common-ui/src/store/categories";
import config from "@controleonline/quasar-common-ui/src/store/config";
import gmaps from "@controleonline/quasar-common-ui/src/store/gmaps";
import menu from "@controleonline/quasar-common-ui/src/store/menu";
import people from "@controleonline/quasar-common-ui/src/store/people";
import profile from "@controleonline/quasar-common-ui/src/store/profile";
import user from "@controleonline/quasar-common-ui/src/store/user";
import users from "@controleonline/quasar-common-ui/src/store/users";
import coupon from "@controleonline/quasar-coupon-ui/src/store/coupon";
import dashboard from "@controleonline/quasar-dashboard-ui/src/mixins/dashboard";
import comissionInvoice from "@controleonline/quasar-financial-ui/src/store/modules/invoice/comission";
import expense from "@controleonline/quasar-financial-ui/src/store/modules/invoice/expense";
import payInvoice from "@controleonline/quasar-financial-ui/src/store/modules/invoice/pay";
import receiveInvoice from "@controleonline/quasar-financial-ui/src/store/modules/invoice/receive";
import guides from "@controleonline/quasar-guides-ui/src/store/guides";
import auth from "@controleonline/quasar-login-ui/src/store/modules/auth";
import comissionOrder from "@controleonline/quasar-orders-ui/src/store/modules/order/comission";
import purchasingOrder from "@controleonline/quasar-orders-ui/src/store/modules/order/purchasing";
import salesOrder from "@controleonline/quasar-orders-ui/src/store/modules/order/sales";
import products from "@controleonline/quasar-products-ui/src/store/products";
import quote from "@controleonline/quasar-quote-ui/src/store/modules/quote";
import support from "@controleonline/quasar-support-ui/src/store/support";
import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
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
      products,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEV,
  });

  return Store;
});
