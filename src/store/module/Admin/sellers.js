import Vue from "vue";
import { Notify } from "quasar";
import * as types from "../../mutation-types";
import doAsync from "../utils/async-util";
import { api } from "boot/axios";

export default {
  state: {},
  actions: {
    async FetchSellers(store) {
      try {
        await doAsync(store, {
          url: "/sellers/",
          mutationTypes: types.GET_INFO_ASYNC_SELLERS
        });
      } catch (e) {}
    },

    async AddSeller(store, data) {
      try {
        await api.post("sellers", data);
        Notify.create({
          message: "Вы успешно добавили продовца",
          type: "positive",
          position: "top"
        });
        store.dispatch("FetchSellers");
      } catch (e) {
        console.log(e);
      }
    }
  },
  mutations: {
    [types.GET_INFO_ASYNC_SELLERS.SUCCESS](state, data) {
      state[types.GET_INFO_ASYNC_SELLERS.loadingKey] = false;
      Vue.set(state, [types.GET_INFO_ASYNC_SELLERS.dataKey], data);
    },
    [types.GET_INFO_ASYNC_SELLERS.PENDING](state) {
      Vue.set(state, types.GET_INFO_ASYNC_SELLERS.loadingKey, true);
    }
  },
  getters: {}
};
