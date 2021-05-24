import Vue from "vue";
import * as types from "../../mutation-types";
import { api } from "boot/axios";
import doAsync from "../utils/async-util";

export default {
  state: {
    allColors: []
  },
  actions: {
    async FetchCategories(store) {
      try {
        let resp = await doAsync(store, {
          url: "/categories/",
          mutationTypes: types.GET_INFO_ASYNC_SHOES_CATEGORIES
        });

        store.commit("setAllColors", resp.data.colors);
      } catch (e) {}
    },

    async FetchAllProducts(store, params) {
      try {
        await doAsync(
          store,
          {
            url: "/products/",
            mutationTypes: types.GET_INFO_ASYNC_PRODUCTS
          },
          params
        );
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
    },
    [types.GET_INFO_ASYNC_PRODUCTS.SUCCESS](state, data) {
      state[types.GET_INFO_ASYNC_PRODUCTS.loadingKey] = false;
      Vue.set(state, [types.GET_INFO_ASYNC_PRODUCTS.dataKey], data);
    },
    [types.GET_INFO_ASYNC_PRODUCTS.PENDING](state) {
      Vue.set(state, types.GET_INFO_ASYNC_PRODUCTS.loadingKey, true);
    },
    setAllColors(state, payload) {
      state.allColors = payload;
    }
  },
  getters: {
    getAllColors: state => state.allColors
  }
};
