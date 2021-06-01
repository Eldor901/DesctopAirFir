import Vue from "vue";
import * as types from "../../mutation-types";
import { Notify, Dialog } from "quasar";
import { api } from "boot/axios";
import doAsync from "../utils/async-util";
import ConfirmDialog from "src/components/Dialogs/ConfirmDialog.vue";
import PartialUpdateDialog from "src/components/Dialogs/PartailUpdateDialog";

export default {
  state: {},
  actions: {
    async FetchAllOrders(store, payload) {
      try {
        await doAsync(
          store,
          {
            url: "/orders/all/",
            mutationTypes: types.GET_INFO_ASYNC_ORDERS
          },
          payload
        );
      } catch (e) {}
    }
  },
  mutations: {
    [types.GET_INFO_ASYNC_ORDERS.SUCCESS](state, data) {
      state[types.GET_INFO_ASYNC_ORDERS.loadingKey] = false;
      Vue.set(state, [types.GET_INFO_ASYNC_ORDERS.dataKey], data);
    },
    [types.GET_INFO_ASYNC_ORDERS.PENDING](state) {
      Vue.set(state, types.GET_INFO_ASYNC_ORDERS.loadingKey, true);
    }
  },
  getters: {}
};
