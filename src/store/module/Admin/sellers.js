import Vue from "vue";
import { Notify, Dialog } from "quasar";
import * as types from "../../mutation-types";
import doAsync from "../utils/async-util";
import { api } from "boot/axios";
import ConfirmDialog from "src/components/Dialogs/ConfirmDialog.vue";

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
        await api.post("/sellers", data);
        Notify.create({
          message: "Вы успешно добавили продовца",
          type: "positive",
          position: "top"
        });
        store.dispatch("FetchSellers");
      } catch (e) {
        console.log(e);
      }
    },

    async DeleteUser(store, id) {
      Dialog.create({
        component: ConfirmDialog,
        title: "Удалить продовца",
        text: "Вы дествительно хотите удалить этого продовца?"
      }).onOk(async data => {
        await api.delete(`sellers/${id}`);
        Notify.create({
          message: "Вы успешно удалили пользователя",
          color: "positive",
          position: "top"
        });
        store.dispatch("FetchSellers");
      });
    },

    async ResetPassword(store, id) {
      Dialog.create({
        component: ConfirmDialog,
        title: "Cбросить пороль",
        text: "Вы дествительно хотите сбросить пороль этого продовца?"
      }).onOk(async data => {
        await api.delete(`sellers/${id}`);
        Notify.create({
          message: "Вы успешно сбросили пороль",
          color: "positive",
          position: "top"
        });
        store.dispatch("FetchSellers");
      });
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
