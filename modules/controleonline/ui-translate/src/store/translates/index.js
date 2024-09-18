import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";
import Formatter from "@controleonline/ui-common/src/utils/formatter.js";

export default {
  namespaced: true,
  state: {
    resourceEndpoint: "translates",
    isLoading: false,
    error: "",
    violations: null,
    totalItems: 0,
    filters: {},
    columns: [
      {
        editable: false,
        isIdentity: true,
        sortable: true,
        name: "id",
        align: "left",
        label: "id",
        sum: false,
        format: function (value) {
          return "#" + value;
        },
      },
      {
        sortable: true,
        name: "store",
        editable: false,
        label: "store",
        align: "left",     
        format(value, column, row) {
          return value;
        },
      },
      {
        sortable: true,
        name: "typo",
        editable: false,
        label: "type",
        align: "left",     
        format(value, column, row) {
          return value;
        },
      },    
      {
        sortable: true,
        name: "translate",
        editable: false,
        label: "translate",
        align: "left",     
        format(value, column, row) {
          return value;
        },
      },        
    ],
  },
  actions: actions,
  getters,
  mutations,
};
