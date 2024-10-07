import { createApp } from "vue";
import Formatter from "@controleonline/ui-common/src/utils/formatter.js";
import * as methods from "@controleonline/ui-common/src/utils/methods.js";
import Translate from "@controleonline/ui-common/src/utils/translate.js";
import { DOMAIN } from "../../config/domain";
import { ENTRYPOINT } from "../../config/entrypoint.js";

const app = createApp({});
const t = new Translate();

export default ({ app }) => {
  app.config.globalProperties.$dbTranslate = { x: "p" };
  app.config.globalProperties.$copyObject = (obj) => methods.copyObject(obj);
  app.config.globalProperties.$formatter = Formatter;
  app.config.globalProperties.$domain = DOMAIN;
  app.config.globalProperties.$entrypoint = ENTRYPOINT;
  app.config.globalProperties.$image = function (file) {
    if (!file) return "https://cdn.quasar.dev/img/avatar4.jpg";

    return (
      ENTRYPOINT +
      "/files/" +
      (typeof file == "object" ? file["@id"] : file)
        .toString()
        .replace(/\D/g, "") +
      "/download" +
      "?_=" +
      btoa(file.fileName)
    );
  };
  app.config.globalProperties.$pdf = function (file) {
    return (
      ENTRYPOINT +
      "/vendor/pdf.js/web/viewer.html?file=" +
      "/files/" +
      file["@id"].replace(/\D/g, "") +
      "/download" +
      encodeURIComponent("?app-domain=" + DOMAIN)
    );
  };

  app.config.globalProperties.$translate = t;
  app.config.globalProperties.$tt = (store, value, type) =>
    t.translate(store, value, type);
};
