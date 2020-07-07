import http from "../http-common";

const getAll = (limit, offset) => {
    limit = limit ?? 16;
    offset = offset ?? 0;

    return http.get(`/type/?limit=${limit}&offset=${offset}`);
};

const get = (id) => {
    return http.get(`/type/${id}`);
};

export default {
  getAll,
  get
};