import { api } from "boot/axios";

const doAsync = async (store, { url, mutationTypes }) => {
  store.commit(mutationTypes.PENDING);
  setTimeout(async () => {
    return await api
      .get(url)
      .then(response => {
        store.commit(mutationTypes.SUCCESS, response.data);
        return Promise.resolve(response);
      })
      .catch(error => {
        store.commit(mutationTypes.FAILURE);
        return Promise.reject(error);
      });
  }, 5000);
};

export default doAsync;
