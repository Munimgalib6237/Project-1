import axios from "axios";

/* Index */
const index = async ({ page, limit }) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}admin?page=${page}&limit=${limit}`,
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
    `${process.env.REACT_APP_ADMIN_ENDPOINT}admin`,
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
    `${process.env.REACT_APP_ADMIN_ENDPOINT}admin/${id}`,
    header
  );
};

export const Admin = {
  index,
  store,
  destroy,
};
