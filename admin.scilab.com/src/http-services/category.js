import axios from "axios";

/* Index */
const index = async ({ page, limit }) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}category?page=${page}&limit=${limit}`,
    header
  );
};

/* store */
const store = async (data) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.post(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}category`,
    data,
    header
  );
};

/* show */
const show = async (id) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}category/${id}`,
    header
  );
};

/* edit */
const edit = async (id, data) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.put(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}category/${id}`,
    data,
    header
  );
};

/* destroy */
const destroy = async (id) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.delete(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}category/${id}`,
    header
  );
};

export const Category = {
  index,
  store,
  show,
  edit,
  destroy,
};
