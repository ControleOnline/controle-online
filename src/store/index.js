import categories from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/categories";
import status from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/status";
import config from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/config";
import gmaps from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/gmaps";
import menu from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/menu";
import people from "@controleonline/quasar-legacy-ui/quasar-people-ui/src/store/people";
import profile from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/profile";
import user from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/user";
import users from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/users";
import coupon from "@controleonline/quasar-legacy-ui/quasar-coupon-ui/src/store/coupon";
import dashboard from "@controleonline/quasar-legacy-ui/quasar-dashboard-ui/src/mixins/dashboard";
import invoice from "@controleonline/quasar-financial-ui/src/store/invoice";
import guides from "@controleonline/quasar-legacy-ui/quasar-guides-ui/src/store/guides";
import auth from "@controleonline/quasar-legacy-ui/quasar-login-ui/src/store/modules/auth";
import purchasingOrder from "@controleonline/quasar-legacy-ui/quasar-orders-ui/src/store/modules/order/purchasing";
import salesOrder from "@controleonline/quasar-legacy-ui/quasar-orders-ui/src/store/modules/order/sales";
import logistic from "@controleonline/quasar-logistic-ui/src/store/modules/logistic";

import products from "@controleonline/quasar-products-ui/src/store/products";
import quote from "@controleonline/quasar-legacy-ui/quasar-logistic-ui/src/store/modules/quote";
import support from "@controleonline/quasar-legacy-ui/quasar-support-ui/src/store/support";
import queues from "@controleonline/quasar-queues-ui/src/store/modules/queues";

import { store } from "quasar/wrappers";
import { createStore } from "vuex";

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      status,
      auth,
      queues,
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
      invoice,
      support,
      guides,
      categories,
      menu,
      users,
      products,
      logistic,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
