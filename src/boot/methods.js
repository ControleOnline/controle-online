import { createApp } from 'vue';
import { translate, copyObject } from '@controleonline/quasar-default-ui/src/components/Default/Scripts/DefaultMethods.js';

const app = createApp({});
export default ({ app }) => {
    app.config.globalProperties.$translate = (store, value, type) => translate(store, value, type);
    app.config.globalProperties.$copyObject = (obj) => copyObject(obj);
};