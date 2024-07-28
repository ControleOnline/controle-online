import config from "@controleonline/ui-legacy/ui-common/src/store/config";
import gmaps from "@controleonline/ui-legacy/ui-common/src/store/gmaps";
import menu from "@controleonline/ui-legacy/ui-common/src/store/menu";
import profile from "@controleonline/ui-legacy/ui-common/src/store/profile";
import user from "@controleonline/ui-legacy/ui-common/src/store/user";
import users from "@controleonline/ui-legacy/ui-common/src/store/users";
import coupon from "@controleonline/ui-legacy/ui-coupon/src/store/coupon";
import guides from "@controleonline/ui-legacy/ui-guides/src/store/guides";
import auth from "@controleonline/ui-legacy/ui-login/src/store/modules/auth";
import quote from "@controleonline/ui-legacy/ui-logistic/src/store/modules/quote";
import support from "@controleonline/ui-legacy/ui-support/src/store/support";


import contracts from "@controleonline/ui-people/src/store/contracts";
import companies from "@controleonline/ui-people/src/store/companies";
import usersCustomer from "@controleonline/ui-people/src/store/usersCustomer";
import addresses from "@controleonline/ui-people/src/store/addresses";
import documents from "@controleonline/ui-people/src/store/documents";
import phones from "@controleonline/ui-people/src/store/phones";
import emails from "@controleonline/ui-people/src/store/emails";
import people from "@controleonline/ui-people/src/store/people";
import theme from "@controleonline/ui-layout/src/store/theme";
import orders from "@controleonline/ui-orders/src/store/orders";
import logistic from "@controleonline/ui-logistic/src/store/logistic";
import invoice from "@controleonline/ui-financial/src/store/invoice";
import wallet from "@controleonline/ui-financial/src/store/wallet";
import paymentType from "@controleonline/ui-financial/src/store/paymentType";
import categories from "@controleonline/ui-common/src/store/categories";
import status from "@controleonline/ui-common/src/store/status";
import products from "@controleonline/ui-products/src/store/products";
import product_unit from "@controleonline/ui-products/src/store/products/product_unit";
import product_group from "@controleonline/ui-products/src/store/products/product_group";
import product_group_product from "@controleonline/ui-products/src/store/products/product_group_product";
import product_group_feedstock from "@controleonline/ui-products/src/store/products/product_group_feedstock";
import displays from "@controleonline/ui-queues/src/store/modules/displays";
import queues from "@controleonline/ui-queues/src/store/modules/queues";
import city from "@controleonline/ui-common/src/store/address/city";
import tasks from "@controleonline/ui-tasks/src/store/tasks";
import crm from "@controleonline/ui-crm/src/store/crm";

import extra_fields from "@controleonline/ui-common/src/store/extra/fields";
import extra_data from "@controleonline/ui-common/src/store/extra/data";

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
      contracts,
      emails,
      addresses,
      phones,
      documents,
      usersCustomer,
      companies,
      people,
      config,
      profile,
      user,
      quote,
      invoice,
      wallet,
      paymentType,
      support,
      guides,
      categories,
      menu,
      users,
      products,
      product_unit,
      product_group,
      product_group_product,
      product_group_feedstock,
      logistic,
      city,
      orders,
      theme,
      tasks,
      crm,
      extra_fields,
      extra_data,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
