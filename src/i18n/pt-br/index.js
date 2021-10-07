// This is just an example,
// so you can safely delete all default props below

import * as Common from '@controleonline/quasar-common-ui/src/i18n/pt-br/index';
import * as Dashboard from '@controleonline/quasar-dashboard-ui/src/i18n/pt-br/index';
import * as Login from '@controleonline/quasar-login-ui/src/i18n/pt-br/index';
import * as Orders from '@controleonline/quasar-orders-ui/src/i18n/pt-br/index';
import * as Financial from '@controleonline/quasar-financial-ui/src/i18n/pt-br/index';
import * as Contracts from '@controleonline/quasar-contracts-ui/src/i18n/pt-br/index';
import * as Tasks from '@controleonline/quasar-tasks-ui/src/i18n/pt-br/index';
import * as Professionals from '@controleonline/quasar-professionals-ui/src/i18n/pt-br/index';
import * as Carriers from '@freteclick/quasar-carrier-ui/src/i18n/pt-br/index';
import * as Quote from '@freteclick/quasar-quote-ui/src/i18n/pt-br/index';
import * as Accounting from '@controleonline/quasar-accounting-ui/src/i18n/pt-br/index';

export default {
  app: {
    name: 'ContabiOn'
  },
  ...Common.translate,
  ...Dashboard.translate,
  ...Login.translate,
  ...Orders.translate,
  ...Financial.translate,
  ...Contracts.translate,
  ...Tasks.translate,
  ...Professionals.translate,
  ...Carriers.translate,
  ...Quote.translate,
  ...Accounting.translate,
}
