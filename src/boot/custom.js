import Contracts from "@controleonline/ui-legacy/ui-contracts";
import Dashboard from "@controleonline/ui-legacy/ui-dashboard";
import { boot } from "quasar/wrappers";


export default boot(({ app }) => {
  app.use(Contracts);
  app.use(Dashboard);


});
