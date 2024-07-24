// This is just an example,
// so you can safely delete all default props below

// This is just an example,
// so you can safely delete all default props below

import * as Common from "@controleonline/ui-legacy/ui-common/src/i18n/pt-br/index";
import * as Dashboard from "@controleonline/ui-legacy/ui-dashboard/src/i18n/pt-br/index";
import * as Login from "@controleonline/ui-legacy/ui-login/src/i18n/pt-br/index";
import * as Financial from "@controleonline/ui-financial/src/i18n/pt-br/index";
import * as Contracts from "@controleonline/ui-legacy/ui-contracts/src/i18n/pt-br/index";
import * as Tasks from "@controleonline/ui-tasks/src/i18n/pt-br/index";
import * as Professionals from "@controleonline/ui-professionals/src/i18n/pt-br/index";
import * as Carriers from "@controleonline/ui-carrier/src/i18n/pt-br/index";
import * as Logistic from "@controleonline/ui-logistic/src/i18n/pt-br/index";
import * as Coupon from "@controleonline/ui-legacy/ui-coupon/src/i18n/pt-br/index";
import * as Accounting from "@controleonline/ui-legacy/ui-accounting/src/i18n/pt-br/index";
import * as Import from "@controleonline/ui-legacy/ui-import/src/i18n/pt-br/index";
import * as CRM from "@controleonline/ui-crm/src/i18n/pt-br/index";
import * as People from "@controleonline/ui-people/src/i18n/pt-br/index";
// import * as People from "../../../modules/controleonline/ui-people/src/i18n/pt-br/index";
import * as Docs from "@controleonline/ui-legacy/ui-docs/src/i18n/pt-br/index";
import * as Config from "@controleonline/ui-legacy/ui-config/src/i18n/pt-br/index";
import * as Products from "@controleonline/ui-products/src/i18n/pt-br/index";
import * as Queues from "@controleonline/ui-queues/src/i18n/pt-br/index";
import * as Default from "@controleonline/ui-default/src/i18n/pt-br/index";
import * as Logistic_old from "@controleonline/ui-legacy/ui-logistic/src/i18n/pt-br/index";
import * as Orders from "@controleonline/ui-orders/src/i18n/pt-br/index";

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
