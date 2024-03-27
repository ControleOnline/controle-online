import config from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/config";
import gmaps from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/gmaps";
import menu from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/menu";
import profile from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/profile";
import user from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/user";
import users from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/store/users";
import coupon from "@controleonline/quasar-legacy-ui/quasar-coupon-ui/src/store/coupon";
import dashboard from "@controleonline/quasar-legacy-ui/quasar-dashboard-ui/src/mixins/dashboard";
import guides from "@controleonline/quasar-legacy-ui/quasar-guides-ui/src/store/guides";
import auth from "@controleonline/quasar-legacy-ui/quasar-login-ui/src/store/modules/auth";
import purchasingOrder from "@controleonline/quasar-legacy-ui/quasar-orders-ui/src/store/modules/order/purchasing";
import salesOrder from "@controleonline/quasar-legacy-ui/quasar-orders-ui/src/store/modules/order/sales";
import quote from "@controleonline/quasar-legacy-ui/quasar-logistic-ui/src/store/modules/quote";
import support from "@controleonline/quasar-legacy-ui/quasar-support-ui/src/store/support";

import people from "@controleonline/quasar-people-ui/src/store/people";
import theme from "@controleonline/quasar-layout-ui/src/store/theme";
import orders from "@controleonline/quasar-orders-ui/src/store/orders";
import logistic from "@controleonline/quasar-logistic-ui/src/store/logistic";
import invoice from "@controleonline/quasar-financial-ui/src/store/invoice";
import wallet from "@controleonline/quasar-financial-ui/src/store/wallet";
import paymentType from "@controleonline/quasar-financial-ui/src/store/paymentType";
import categories from "@controleonline/quasar-common-ui/src/store/categories";
import status from "@controleonline/quasar-common-ui/src/store/status";
import products from "@controleonline/quasar-products-ui/src/store/products";
import productUnit from "@controleonline/quasar-products-ui/src/store/products/productUnit";
import displays from "@controleonline/quasar-queues-ui/src/store/modules/displays";
import queues from "@controleonline/quasar-queues-ui/src/store/modules/queues";
import city from "@controleonline/quasar-common-ui/src/store/address/city";
import tasks from "@controleonline/quasar-tasks-ui/src/store/tasks";
import crm from "@controleonline/quasar-crm-ui/src/store/crm";

import { store } from "quasar/wrappers";
import { createStore } from "vuex";

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      status,
      auth,
      queues,
      displays,
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
      wallet,
      paymentType,
      support,
      guides,
      categories,
      menu,
      users,
      products,
      productUnit,
      logistic,
      city,
      orders,
      theme,
      tasks,
      crm
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
