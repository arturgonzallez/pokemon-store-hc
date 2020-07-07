import http from "../http-common";

const getAll = (limit, offset) => {
    limit = limit ?? 12;
    offset = offset ?? 0;

    return http.get(`/pokemon/?limit=${limit}&offset=${offset}`);
};

const get = (id) => {
    return http.get(`/type/${id}`);
};

const findByName = (name, limit, offset) => {
    limit = limit ?? 20;
    offset = offset ?? 0;

    return http.get(`/pokemon/${name}?limit=${limit}&offset=${offset}`);
};

export default {
  getAll,
  get,
  findByName
};