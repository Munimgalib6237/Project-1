import axios from "axios";

/* Index */
const index = async ({ page, limit }) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}publication?page=${page}&limit=${limit}`,
    header
  );
};

/* Change status */
const changeStatus = async (id) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.put(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}publication/${id}`,
    "",
    header
  );
};

export const Publication = {
  index,
  changeStatus,
};
