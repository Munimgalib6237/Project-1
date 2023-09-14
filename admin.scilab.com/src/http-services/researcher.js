import axios from "axios";

/* Index */
const index = async ({ page, limit }) => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}researcher?page=${page}&limit=${limit}`,
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
    `${process.env.REACT_APP_ADMIN_ENDPOINT}researcher/${id}`,
    header
  );
};

export const Researcher = {
  index,
  show,
};
