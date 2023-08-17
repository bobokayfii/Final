import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { EXPIRE_DATE, ROLE, TOKEN } from "../const";
import { request } from "../server/request";

export const AuthContext = createContext();

const checkTokenAvailability = () => {
  Cookies.get(TOKEN) && Cookies.get(EXPIRE_DATE) >= Date.now() ? true : false;
  const token = Cookies.get(TOKEN);
  const expireDate = Cookies.get(EXPIRE_DATE);
  if (token && expireDate >= Date.now()) {
    return true;
  }
  return false;
};

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkTokenAvailability()
  );

  const [role, setRole] = useState(Cookies.get(ROLE) || null);

  const [categorySliderLoading, setCategorySliderLoading] = useState(false);
  const [categoryOnec, setCategoryOnec] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);

  const [token, setToken] = useState(null);

  const getCategoryOnes = useCallback(async () => {
    try {
      setCategorySliderLoading(true);
      const { data } = await request("category");
      let arr = data?.data?.map((el) => {
        return { value: el._id, label: el.name };
      });
      setCategoriesName(arr);
      setCategoryOnec(data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setCategorySliderLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategoryOnes();
  }, [getCategoryOnes]);

  let state = {
    categorySliderLoading,
    categoryOnec,
    categoriesName,
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
    token,
    setToken,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
