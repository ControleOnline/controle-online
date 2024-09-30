import { boot } from "quasar/wrappers";
import DefaultTable from "@controleonline/ui-default/src/components/Default/DefaultTable";
import DefaultForm from "@controleonline/ui-default/src/components/Default/Common/DefaultForm";
import File from "@controleonline/ui-default/src/components/Default/Common/Inputs/File.vue";
import FileExplorer from "@controleonline/ui-common/src/components/Common/FileExplorer";

export default boot(({ app }) => {
  app.component("DefaultTable", DefaultTable);
  app.component("FileExplorer", FileExplorer);
  app.component("DefaultForm", DefaultForm);
  app.component("File", File);

  app.config.globalProperties.$components = {
    DefaultTable,
    FileExplorer,
    DefaultForm,
    File,
  };
});
