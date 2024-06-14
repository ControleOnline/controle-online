import * as Accounting from "@controleonline/quasar-legacy-ui/quasar-accounting-ui/src/router/routes";
import * as Carrier from "@controleonline/quasar-legacy-ui/quasar-carrier-ui/src/router/routes";
import * as Config from "@controleonline/quasar-legacy-ui/quasar-config-ui/src/router/routes";
import * as Contracts from "@controleonline/quasar-legacy-ui/quasar-contracts-ui/src/router/routes";
import * as Coupon from "@controleonline/quasar-legacy-ui/quasar-coupon-ui/src/router/routes";
import * as Crm from "@controleonline/quasar-crm-ui/src/router/routes";
import * as Customers from "@controleonline/quasar-customers-ui/src/router/routes";
import * as Dashboard from "@controleonline/quasar-legacy-ui/quasar-dashboard-ui/src/router/routes";
import * as Docs from "@controleonline/quasar-legacy-ui/quasar-docs-ui/src/router/routes";
import * as Financial from "@controleonline/quasar-financial-ui/src/router/routes";
import * as Import from "@controleonline/quasar-legacy-ui/quasar-import-ui/src/router/routes";
import * as Login from "@controleonline/quasar-legacy-ui/quasar-login-ui/src/router/routes";
import * as Quotations from "@controleonline/quasar-legacy-ui/quasar-orders-ui/src/router/routes";
import * as Products from "@controleonline/quasar-products-ui/src/router/routes";
import * as Professionals from "@controleonline/quasar-legacy-ui/quasar-professionals-ui/src/router/routes";
import * as Providers from "@controleonline/quasar-legacy-ui/quasar-providers-ui/src/router/routes";
import * as Queues from "@controleonline/quasar-queues-ui/src/router/routes";
import * as Logistic from "@controleonline/quasar-logistic-ui/src/router/routes";
import * as Support from "@controleonline/quasar-legacy-ui/quasar-support-ui/src/router/routes";
import * as Tasks from "@controleonline/quasar-tasks-ui/src/router/routes";
import * as People from "@controleonline/quasar-people-ui/src/router/routes";

import * as Users from "@controleonline/quasar-users-ui/src/router/routes";
import * as Logistic_old from "@controleonline/quasar-legacy-ui/quasar-logistic-ui/src/router/routes";
import * as Orders from "@controleonline/quasar-orders-ui/src/router/routes";
 

const routes = [
  ...Login.routes,
  ...Logistic.routes,
  ...Quotations.routes,
  ...Financial.routes,
  ...Providers.routes,
  ...Customers.routes,
  ...Contracts.routes,
  ...Tasks.routes,
  ...Carrier.routes,
  ...Users.routes,
  ...Dashboard.routes,
  ...Support.routes,
  ...Coupon.routes,
  ...Accounting.routes,
  ...Import.routes,
  ...Crm.routes,
  ...Docs.routes,
  ...Config.routes,
  ...Products.routes,
  ...Professionals.routes,
  ...Queues.routes,
  ...Orders.routes,
  ...Logistic_old.routes,
  ...People.routes,
  {
    path: "/",
    component: () => import("@controleonline/quasar-layout-ui/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "HomeIndex",
        path: "home",
        component: () =>
          import("@controleonline/quasar-layout-ui/src/pages/Home"),
      },
    ],
  },

  {
    path: "/calc",
    component: () => import("@controleonline/quasar-layout-ui/src/layouts/MainLayout.vue"),
    children: [
      {
        name: "CalculatorIndex",
        path: "calculator",
        component: () => import("pages/Calculator.vue"),
      },
    ],
  },
  {
    path: "/infos/",
    component: () => import("@controleonline/quasar-layout-ui/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "BasicInfoIndex",
        path: ":id",
        component: () => import("pages/BasicInfo/Index.vue"),
      },
    ],
  },
  {
    path: "/planos/",
    component: () => import("@controleonline/quasar-layout-ui/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "PlansIndex",
        path: "",
        component: () => import("pages/Plans/Index.vue"),
      },
      {
        name: "PlansDetails",
        path: ":id",
        component: () => import("pages/Plans/Details.vue"),
      },
      {
        name: "PlansCreate",
        path: "novo",
        component: () => import("pages/Plans/Create.vue"),
      },
    ],
  },
  {
    path: "/etapas-do-cadastro/",
    component: () => import("@controleonline/quasar-layout-ui/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "StepsRegistration",
        path: "",
        component: () => import("pages/StepsRegistration/Index.vue"),
      },
      {
        name: "StepsRegistrationAnalysis",
        path: ":id",
        component: () => import("pages/StepsRegistration/Analysis.vue"),
      },
      {
        name: "StepsRegistrationHistory",
        path: ":id/historico",
        component: () => import("pages/StepsRegistration/Historico.vue"),
      },
    ],
  },

  {
    path: "/servicos-adicionais/",
    component: () => import("@controleonline/quasar-layout-ui/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "ServicosAdicionaisIndex",
        path: "",
        component: () => import("pages/Servicos/Index.vue"),
      },
      {
        name: "ServicosAdicionaisCreate",
        path: "novo",
        component: () => import("pages/Servicos/Create.vue"),
      },
      {
        name: "ServicosAdicionaisEdit",
        path: ":id",
        component: () => import("pages/Servicos/Edit.vue"),
      },
    ],
  },

];

export default routes;
