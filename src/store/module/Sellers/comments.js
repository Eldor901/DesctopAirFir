import Vue from "vue";
import * as types from "../../mutation-types";
import { Notify, Dialog } from "quasar";
import { api } from "boot/axios";
import doAsync from "../utils/async-util";
import CommentsDialog from "src/components/Dialogs/CommentsDialog.vue";

export default {
  state: {},
  actions: {
    async FetchAllComments(store, payload) {
      try {
        await doAsync(
          store,
          {
            url: "/orders/comments",
            mutationTypes: types.GET_INFO_ASYNC_COMMENTS
          },
          payload
        );
      } catch (e) {}
    },

    OpenComment(store, payload) {
      return new Promise((resolve, reject) => {
        try {
          Dialog.create({
            component: CommentsDialog,
            userInfo: payload
          }).onOk(async data => {
            await api.delete(`/orders/comment/${payload.orderId}`);
            Notify.create({
              message: "Вы успешно удалили комментарий",
              color: "positive",
              position: "top"
            });
            resolve();
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  },
  mutations: {
    [types.GET_INFO_ASYNC_COMMENTS.SUCCESS](state, data) {
      state[types.GET_INFO_ASYNC_COMMENTS.loadingKey] = false;
      Vue.set(state, [types.GET_INFO_ASYNC_COMMENTS.dataKey], data);
    },
    [types.GET_INFO_ASYNC_COMMENTS.PENDING](state) {
      Vue.set(state, types.GET_INFO_ASYNC_COMMENTS.loadingKey, true);
    }
  },
  getters: {}
};
