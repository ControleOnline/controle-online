import Contracts from "@controleonline/quasar-legacy-ui/quasar-contracts-ui";
import Dashboard from "@controleonline/quasar-legacy-ui/quasar-dashboard-ui";
import { boot } from "quasar/wrappers";
import {
  translate,
  copyObject,
} from "@controleonline/quasar-default-ui/src/components/Default/Scripts/DefaultMethods.js";
import Formatter from "@controleonline/quasar-common-ui/src/utils/formatter.js";

export default boot(({ app }) => {
  app.use(Contracts);
  app.use(Dashboard);

  app.config.globalProperties.$formatter = new Formatter();
  app.config.globalProperties.$translate = (store, value, type) =>
    translate(store, value, type);
  app.config.globalProperties.$copyObject = (obj) => copyObject(obj);

});
