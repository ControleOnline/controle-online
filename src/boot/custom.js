import Contracts from "@controleonline/quasar-contracts-ui";
import Dashboard from "@controleonline/quasar-dashboard-ui";
import { boot } from "quasar/wrappers";
import {
  translate,
  copyObject,
} from "@controleonline/quasar-default-ui/src/components/Default/Scripts/DefaultMethods.js";

export default boot(({ app }) => {
  app.use(Contracts);
  app.use(Dashboard);

  app.config.globalProperties.$translate = (store, value, type) =>
    translate(store, value, type);
  app.config.globalProperties.$copyObject = (obj) => copyObject(obj);
});
