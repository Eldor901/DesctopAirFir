import Vue from "vue";
import * as types from "../../mutation-types";
import { Notify, Dialog } from "quasar";
import { api } from "boot/axios";
import doAsync from "../utils/async-util";
import ConfirmDialog from "src/components/Dialogs/ConfirmDialog.vue";
import PartialUpdateDialog from "src/components/Dialogs/PartailUpdateDialog";

export default {
  state: {
    allColors: [],
    filterData: {
      take: 10,
      page: 1
    }
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

    async ProductsFilters(store, data) {
      try {
        store.commit("setFilter", data);
      } catch (e) {}
    },

    async FetchAllProducts(store) {
      console.log(store.getters.getFilterData);
      try {
        await doAsync(
          store,
          {
            url: "/products/",
            mutationTypes: types.GET_INFO_ASYNC_PRODUCTS
          },
          store.getters.getFilterData
        );
      } catch (e) {}
    },

    async FetchProduct(strore, id) {
      try {
        let resp = await api.get(`/products/${id}`);
        return resp.data;
      } catch (e) {}
    },

    async CreateProduct(strore, data) {
      try {
        await api.post("products", data);
        Notify.create({
          message: "Вы успешно добавили Продукт",
          type: "positive",
          position: "top"
        });
      } catch (e) {
        Notify.create({
          message: "Продукт не загрузилось. Все поля должны быть заполнены",
          type: "negative",
          position: "top"
        });
      }
    },

    async DeleteProduct(store, id) {
      Dialog.create({
        component: ConfirmDialog,
        title: "Удалить продукт",
        text: "Вы дествительно хотите удалить этот продукт?"
      }).onOk(async data => {
        await api.delete(`products/${id}`);
        Notify.create({
          message: "Вы успешно удалили продукт",
          color: "positive",
          position: "top"
        });
        store.dispatch("FetchAllProducts");
      });
    },

    async UpdateProduct(store, data) {
      try {
        await api.put(`products/${data.id}`, data.form);
        Notify.create({
          message: "Вы успешно изменили Продукт",
          type: "positive",
          position: "top"
        });
      } catch (e) {
        Notify.create({
          message: "Продукт не загрузилось. Все поля должны быть заполнены",
          type: "negative",
          position: "top"
        });
      }
    },

    async PartialUpdateProduct(store, id) {
      try {
        let resp = await api.get(`/products/${id}/quantities`);
        Dialog.create({
          component: PartialUpdateDialog,
          data: resp.data
        }).onOk(async data => {
          await api.put(`products/${id}/partial`, data);
          Notify.create({
            message: "Вы успешно изменили продукт",
            color: "positive",
            position: "top"
          });
          store.dispatch("FetchAllProducts");
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
    },
    setFilter(state, payload) {
      state.filterData = Object.assign({}, state.filterData, payload);
    }
  },
  getters: {
    getAllColors: state => state.allColors,
    getFilterData: state => state.filterData
  }
};
