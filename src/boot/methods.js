import { createApp } from "vue";
import Formatter from "@controleonline/quasar-common-ui/src/utils/formatter.js";
import {
  translate,
  copyObject,
} from "@controleonline/quasar-default-ui/src/components/Default/Scripts/DefaultMethods.js";

const app = createApp({});
export default ({ app }) => {
  app.config.globalProperties.$copyObject = (obj) => copyObject(obj);
  app.config.globalProperties.$formatter = Formatter;
  app.config.globalProperties.$translate = (store, value, type) =>
    translate(store, value, type);
};
