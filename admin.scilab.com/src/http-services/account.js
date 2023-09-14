import axios from "axios";

/* Account details (me) */
const me = async () => {
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  return await axios.get(
    `${process.env.REACT_APP_ADMIN_ENDPOINT}account`,
    header
  );
};

export const Account = {
  me,
};
