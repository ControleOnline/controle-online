import { createApp } from "vue";
import Formatter from "@controleonline/ui-common/src/utils/formatter.js";
import {
  translate,
  copyObject,
} from "@controleonline/ui-default/src/components/Default/Scripts/DefaultMethods.js";
import { DOMAIN } from "../../config/domain";
import { ENTRYPOINT } from "../../config/entrypoint.js";

const app = createApp({});
export default ({ app }) => {
  app.config.globalProperties.$copyObject = (obj) => copyObject(obj);
  app.config.globalProperties.$formatter = Formatter;
  app.config.globalProperties.$domain = DOMAIN;
  app.config.globalProperties.$entrypoint = ENTRYPOINT;
  app.config.globalProperties.$translate = (store, value, type) =>
    translate(store, value, type);
};
