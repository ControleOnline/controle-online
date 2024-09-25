import * as Accounting from "@controleonline/ui-accounting/src/router/routes";
import * as Carrier from "@controleonline/ui-carrier/src/router/routes";
import * as Config from "@controleonline/ui-config/src/router/routes";
import * as Contracts from "@controleonline/ui-contracts/src/router/routes";
import * as Crm from "@controleonline/ui-crm/src/router/routes";
import * as Customers from "@controleonline/ui-customers/src/router/routes";
import * as Dashboard from "@controleonline/ui-dashboard/src/router/routes";
import * as Docs from "@controleonline/ui-legacy/ui-docs/src/router/routes";
import * as Financial from "@controleonline/ui-financial/src/router/routes";
import * as Login from "@controleonline/ui-login/src/router/routes";
import * as Products from "@controleonline/ui-products/src/router/routes";
import * as Professionals from "@controleonline/ui-professionals/src/router/routes";
import * as Employee from "@controleonline/ui-employee/src/router/routes";
import * as Providers from "@controleonline/ui-providers/src/router/routes";
import * as Queues from "@controleonline/ui-queues/src/router/routes";
import * as Logistic from "@controleonline/ui-logistic/src/router/routes";
import * as Support from "@controleonline/ui-support/src/router/routes";
import * as Tasks from "@controleonline/ui-tasks/src/router/routes";
import * as People from "@controleonline/ui-people/src/router/routes";
import * as Translate from "@controleonline/ui-translate/src/router/routes";
import * as Contents from "@controleonline/ui-ead/src/router/routes";


import * as Users from "@controleonline/ui-users/src/router/routes";
import * as Logistic_old from "@controleonline/ui-legacy/ui-logistic/src/router/routes";
import * as Orders from "@controleonline/ui-orders/src/router/routes";

const routes = [
  ...Login.routes,
  ...Logistic.routes,
  ...Financial.routes,
  ...Providers.routes,
  ...Customers.routes,
  ...Contracts.routes,
  ...Tasks.routes,
  ...Carrier.routes,
  ...Users.routes,
  ...Dashboard.routes,
  ...Support.routes,
  ...Accounting.routes,
  ...Crm.routes,
  ...Docs.routes,
  ...Config.routes,
  ...Employee.routes,
  ...Products.routes,
  ...Professionals.routes,
  ...Queues.routes,
  ...Orders.routes,
  ...Logistic_old.routes,
  ...People.routes,
  ...Translate.routes,
  ...Contents.routes,
  {
    path: "/",
    component: () =>
      import("@controleonline/ui-layout/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "HomeIndex",
        path: "home",
        component: () => import("@controleonline/ui-layout/src/pages/Home"),
      },
    ],
  },

  {
    path: "/calc",
    component: () =>
      import("@controleonline/ui-layout/src/layouts/MainLayout.vue"),
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
    component: () =>
      import("@controleonline/ui-layout/src/layouts/AdminLayout.vue"),
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
    component: () =>
      import("@controleonline/ui-layout/src/layouts/AdminLayout.vue"),
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
    component: () =>
      import("@controleonline/ui-layout/src/layouts/AdminLayout.vue"),
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
    component: () =>
      import("@controleonline/ui-layout/src/layouts/AdminLayout.vue"),
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
