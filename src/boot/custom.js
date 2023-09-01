import Contracts from "@controleonline/quasar-contracts-ui";
import Dashboard from "@controleonline/quasar-dashboard-ui";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.use(Contracts);
  app.use(Dashboard);
});
