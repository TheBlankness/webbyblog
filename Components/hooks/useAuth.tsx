import { useState, useEffect } from "react";
import {
  selectUserSession,
  saveusertoken,
  login as LoginUser,
} from "../userSession/userSessionSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

function useAuth() {
  const userSession = useAppSelector(selectUserSession);
  const [islogin, setIslogin] = useState(false);

  useEffect(() => {
    setIslogin(userSession.islogin);
  }, [userSession]);

  return islogin;
}

export default useAuth;
