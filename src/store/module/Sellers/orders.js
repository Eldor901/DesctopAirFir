import Vue from "vue";
import * as types from "../../mutation-types";
import { Notify, Dialog } from "quasar";
import { api } from "boot/axios";
import doAsync from "../utils/async-util";
import SendTrackCodeDialog from "src/components/Dialogs/SendTrackCodeDialog.vue";
import ConfirmDialog from "src/components/Dialogs/ConfirmDialog.vue";

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
    },

    SendOrder(store, id) {
      return new Promise((resolve, reject) => {
        try {
          Dialog.create({
            component: SendTrackCodeDialog,
            title: "Отправить Заказ"
          }).onOk(async trackCode => {
            await api.patch(`/orders/${id}/send/`, {
              trackCode
            });
            Notify.create({
              message: "Вы успешно отправили продукт",
              color: "positive",
              position: "top"
            });
            resolve();
          });
        } catch (e) {
          reject(e);
        }
      });
    },

    ReturnMoney(store, id) {
      return new Promise((resolve, reject) => {
        try {
          Dialog.create({
            component: ConfirmDialog,
            title: "Возврат",
            text: "Вы действительно хотите выполнить операцию возврат денег?"
          }).onOk(async data => {
            await api.patch(`/orders/${id}/return-money/`);
            Notify.create({
              message: "Операцию возврат денег успешно выполнина",
              color: "positive",
              position: "top"
            });
            resolve();
          });
        } catch (e) {
          reject(e);
        }
      });
    },
    CanselReturn(store, id) {
      return new Promise((resolve, reject) => {
        try {
          Dialog.create({
            component: ConfirmDialog,
            title: "Возврат",
            text: "Вы действительно хотите выполнить операцию отметить возврат?"
          }).onOk(async data => {
            await api.patch(`/orders/${id}/cancel-return/`);
            Notify.create({
              message: "операцию отметить возврат  успешно выполнина",
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
