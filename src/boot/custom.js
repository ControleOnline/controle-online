import { boot } from "quasar/wrappers";
import DefaultTable from "@controleonline/ui-default/src/components/Default/DefaultTable";


export default boot(({ app }) => {
    app.component('DefaultTable', DefaultTable);

});
