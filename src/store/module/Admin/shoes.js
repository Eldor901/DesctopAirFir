import Vue from "vue";
import * as types from "../../mutation-types";
import doAsync from "../utils/async-util";

export default {
  state: {},
  actions: {
    async FetchSellers(store) {
      try {
        await doAsync(store, {
          url: "/categories/",
          mutationTypes: types.GET_INFO_ASYNC_SHOES_CATEGORIES
        });
      } catch (e) {}
    }
  },
  mutations: {
    [types.GET_INFO_ASYNC_SHOES_CATEGORIES.SUCCESS](state, data) {
      state[types.GET_INFO_ASYNC_SHOES_CATEGORIES.loadingKey] = false;
      Vue.set(state, [types.GET_INFO_ASYNC_SHOES_CATEGORIES.dataKey], data);
    },
    [types.GET_INFO_ASYNC_SHOES_CATEGORIES.PENDING](state) {
      Vue.set(state, types.GET_INFO_ASYNC_SHOES_CATEGORIES.loadingKey, true);
    }
  },
  getters: {}
};
