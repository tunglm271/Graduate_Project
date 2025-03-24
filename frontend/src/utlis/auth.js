import Cookies from "js-cookie";

export const getUser = () => {
  return {
    id: Cookies.get("user_id"),
    name: Cookies.get("name"),
    avatar: Cookies.get("avatar"),
    role: Cookies.get("role")
  };
};
