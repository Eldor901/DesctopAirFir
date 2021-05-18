import _ from "lodash";

const createAsyncMutation = type => ({
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  PENDING: `${type}_PENDING`,
  loadingKey: _.camelCase(`${type}_LOADING`),
  dataKey: _.camelCase(`${type}_DATA`)
});

export const GET_INFO_ASYNC_SELLERS = createAsyncMutation("GET_INFO_SELLERS");

export const GET_INFO_ASYNC_SHOES_CATEGORIES = createAsyncMutation(
  "GET_INFO_SHOES_CATEGORIES"
);
