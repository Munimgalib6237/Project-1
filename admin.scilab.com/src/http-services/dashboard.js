import axios from "axios";

/* Index */
const index = async () => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}dashboard`,
    header
  );
};

export const Dashboard = {
  index,
};
