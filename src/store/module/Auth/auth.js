import { api } from "boot/axios";
import { ADMIN, SELLER } from "./constants";
import { Notify, Dialog } from "quasar";
import ConfirmDialog from "src/components/Dialogs/ConfirmDialog.vue";

export default {
  state: {
    userInfo: {},
    userData: {}
  },
  actions: {
    async LOGIN({ commit, dispatch }, payload) {
      try {
        let response = await api.post("/auth/signin", payload);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("currentUserId", response.data.id);
        dispatch("TOKEN_SET_GLOBALLY", response.data.accessToken);
        commit("SET_LOGIN", response.data);
      } catch (e) {
        Notify.create({
          message: "пороль или логин введен неправильно.",
          type: "negative",
          position: "top"
        });
      }
    },

    async FetchUserInfo({ commit }) {
      try {
        let response = await api.get("auth/profile");
        return response.data;
      } catch (e) {}
    },

    async ChangePassword({ commit }, payload) {
      try {
        const resp = await api.put(`/auth/change-password`, payload);
        Notify.create({
          message: "Пороль был успешно изменен",
          color: "positive",
          position: "top"
        });
      } catch (e) {
        Notify.create({
          message: "Пороль не был обновлен. Введите Старый пороль правельно",
          color: "negative",
          position: "top"
        });
      }
    },

    async ChangeUserData({ commit }, data) {
      try {
        let resp = await api.put("auth/name", data);
      } catch (e) {}
    },

    TOKEN_SET_GLOBALLY({ commit }) {
      const accessToken = sessionStorage.getItem("accessToken");
      api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    },

    LOGOUT({ commit }) {
      Dialog.create({
        component: ConfirmDialog,
        title: "Выход из системы",
        text: "Вы дествительно хотите выйти из приложения?"
      }).onOk(async data => {
        sessionStorage.clear();
        location.reload();
        this.$router.push("/");
      });
    }
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.userInfo = payload;
      switch (payload.role) {
        case ADMIN:
          this.$router.push("/admin");
          break;
        case SELLER:
          this.$router.push("/seller");
          break;
      }
    },

    USET_DATA(state, payload) {
      state.userData = payload;
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    userData: state => state.userData
  }
};
