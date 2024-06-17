// This is just an example,
// so you can safely delete all default props below

// This is just an example,
// so you can safely delete all default props below

import * as Common from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/i18n/pt-br/index";
import * as Dashboard from "@controleonline/quasar-legacy-ui/quasar-dashboard-ui/src/i18n/pt-br/index";
import * as Login from "@controleonline/quasar-legacy-ui/quasar-login-ui/src/i18n/pt-br/index";
import * as Financial from "@controleonline/quasar-financial-ui/src/i18n/pt-br/index";
import * as Contracts from "@controleonline/quasar-legacy-ui/quasar-contracts-ui/src/i18n/pt-br/index";
import * as Tasks from "@controleonline/quasar-tasks-ui/src/i18n/pt-br/index";
import * as Professionals from "@controleonline/quasar-professionals-ui/src/i18n/pt-br/index";
import * as Carriers from "@controleonline/quasar-carrier-ui/src/i18n/pt-br/index";
import * as Logistic from "@controleonline/quasar-logistic-ui/src/i18n/pt-br/index";
import * as Coupon from "@controleonline/quasar-legacy-ui/quasar-coupon-ui/src/i18n/pt-br/index";
import * as Accounting from "@controleonline/quasar-legacy-ui/quasar-accounting-ui/src/i18n/pt-br/index";
import * as Import from "@controleonline/quasar-legacy-ui/quasar-import-ui/src/i18n/pt-br/index";
import * as CRM from "@controleonline/quasar-crm-ui/src/i18n/pt-br/index";
import * as People from "@controleonline/quasar-people-ui/src/i18n/pt-br/index";
import * as Docs from "@controleonline/quasar-legacy-ui/quasar-docs-ui/src/i18n/pt-br/index";
import * as Config from "@controleonline/quasar-legacy-ui/quasar-config-ui/src/i18n/pt-br/index";
import * as Products from "@controleonline/quasar-products-ui/src/i18n/pt-br/index";
import * as Queues from "@controleonline/quasar-queues-ui/src/i18n/pt-br/index";
import * as Default from "@controleonline/quasar-default-ui/src/i18n/pt-br/index";
import * as Logistic_old from "@controleonline/quasar-legacy-ui/quasar-logistic-ui/src/i18n/pt-br/index";
import * as Orders from "@controleonline/quasar-orders-ui/src/i18n/pt-br/index";

export default {
  app: {
    name: "Controle Online",
  },
  ...People.translate,
  ...Accounting.translate,
  ...Coupon.translate,
  ...Common.translate,
  ...Dashboard.translate,
  ...Financial.translate,
  ...Contracts.translate,
  ...Tasks.translate,
  ...Professionals.translate,
  ...Carriers.translate,
  ...Logistic.translate,
  ...Import.translate,
  ...CRM.translate,
  ...Docs.translate,
  ...Config.translate,
  ...Products.translate,
  ...Login.translate,
  ...Queues.translate,
  ...Default.translate,
  ...Logistic_old.translate,
  ...Orders.translate
};
