import axios from "axios";
import { Notify } from "quasar";

export default {
  state: {},

  actions: {
    async UPLOADFILE({ commit }, file) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("password", process.env.APP_SERVER_PASSWORD);
      try {
        const resp = await axios.post(
          process.env.APP_SERVER_STORAGE_URL,
          formData
        );

        Notify.create({
          message: "файл успешно загрузилось",
          color: "positive",
          position: "top"
        });

        return resp.data.fileUrl;
      } catch (e) {
        Notify.create({
          message: "файл не загрузилось пожалуйста проверьте сервер",
          color: "negative",
          position: "top"
        });
      }
    }
  },

  mutations: {},

  getters: {}
};
