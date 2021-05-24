import { api } from "boot/axios";

const doAsync = async (store, { url, mutationTypes }, params) => {
  store.commit(mutationTypes.PENDING);
  return await api
    .get(url, {
      params
    })
    .then(response => {
      store.commit(mutationTypes.SUCCESS, response.data);
      return Promise.resolve(response);
    })
    .catch(error => {
      store.commit(mutationTypes.FAILURE);
      return Promise.reject(error);
    });
};

export default doAsync;
