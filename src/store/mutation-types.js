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
export const GET_INFO_ASYNC_PRODUCTS = createAsyncMutation("GET_INFO_PRODUCTS");
export const GET_INFO_ASYNC_PRODUCT = createAsyncMutation("GET_INFO_PRODUCT");
export const GET_INFO_ASYNC_ORDERS = createAsyncMutation("GET_INFO_ORDERS");
