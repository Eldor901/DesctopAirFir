import Vue from "vue";
import * as types from "../../mutation-types";
import doAsync from "../utils/async-util";

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
