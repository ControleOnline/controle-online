import { boot } from "quasar/wrappers";
import DefaultTable from "@controleonline/ui-default/src/components/Default/DefaultTable";
import DefaultForm from "@controleonline/ui-default/src/components/Default/Common/DefaultForm";

export default boot(({ app }) => {
    app.component('DefaultTable', DefaultTable);
    app.component('DefaultForm', DefaultForm);


    app.config.globalProperties.$components = {
        DefaultTable,
        DefaultForm,
      };
});
