const API = import.meta.env.VITE_API_URL;

export const endpoints = {
  EXAMPLE_TREE: {
    GET_EXAMPLE: `${API}/example`,
    GET_EXAMPLE_BY_ID: `${API}/example/:id`,
    POST_EXAMPLE: `${API}/example`,
    PUT_EXAMPLE: `${API}/example/:id`,
    DELETE_EXAMPLE: `${API}/example/:id`,
  },
};
