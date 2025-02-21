import * as Accounting from "@controleonline/ui-accounting/src/router/routes";
import * as Carrier from "@controleonline/ui-carrier/src/router/routes";
import * as Config from "@controleonline/ui-config/src/router/routes";
import * as Contracts from "@controleonline/ui-contracts/src/router/routes";
import * as Crm from "@controleonline/ui-crm/src/router/routes";
import * as Customers from "@controleonline/ui-customers/src/router/routes";
import * as Dashboard from "@controleonline/ui-dashboard/src/router/routes";
import * as Financial from "@controleonline/ui-financial/src/router/routes";
import * as Login from "@controleonline/ui-login/src/router/routes";
import * as Products from "@controleonline/ui-products/src/router/routes";
import * as Professionals from "@controleonline/ui-professionals/src/router/routes";
import * as Employee from "@controleonline/ui-employee/src/router/routes";
import * as Providers from "@controleonline/ui-providers/src/router/routes";
import * as Queues from "@controleonline/ui-pcp/src/router/routes";
import * as Logistic from "@controleonline/ui-logistic/src/router/routes";
import * as Support from "@controleonline/ui-support/src/router/routes";
import * as Tasks from "@controleonline/ui-tasks/src/router/routes";
import * as People from "@controleonline/ui-people/src/router/routes";
import * as Translate from "@controleonline/ui-translate/src/router/routes";
import * as Contents from "@controleonline/ui-ead/src/router/routes";

import * as Users from "@controleonline/ui-users/src/router/routes";
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
  ...Config.routes,
  ...Employee.routes,
  ...Products.routes,
  ...Professionals.routes,
  ...Queues.routes,
  ...Orders.routes,
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
];

export default routes;
