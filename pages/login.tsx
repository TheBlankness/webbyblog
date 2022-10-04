import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../Components/Header";
import { ApolloClient, gql, InMemoryCache, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
  Center,
  Flex,
  FormControl,
  Text,
  Box,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import {
  selectUserSession,
  saveusertoken,
  login as LoginUser,
} from "../Components/userSession/userSessionSlice";

const GET_USERTOKEN = gql`
  mutation UserLogin($user_mobile: String!, $password: String!) {
    login(input: { user_mobile: $user_mobile, password: $password }) {
      token
      user {
        user_id
      }
    }
  }
`;

function Login() {
  const userSession = useAppSelector(selectUserSession);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mobileInput, setMobileInput] = useState({
    value: "60166187658",
    isError: false,
  });
  const [passwordInput, setpasswordInput] = useState({
    value: "12345#12345",
    isError: false,
  });
  const [UserLogin, { data, loading, error }] = useMutation(GET_USERTOKEN);

  useEffect(() => {
    if (data === undefined) return;
    console.log(data.login.token);

    dispatch(saveusertoken(data.login.token));
    dispatch(LoginUser());
    localStorage.setItem("token", data.login.token);
    router.push(`/blogs`);
  }, [data, dispatch, router]);

  useEffect(() => {
    if (error === undefined) return;
    console.log(error);
  }, [error]);

  const handleLogin = () => {
    if (mobileInput.value == "") {
      setMobileInput({ value: mobileInput.value, isError: true });
      return;
    }
    if (passwordInput.value == "") {
      setpasswordInput({ value: passwordInput.value, isError: true });
      return;
    }

    UserLogin({
      variables: {
        user_mobile: mobileInput.value,
        password: passwordInput.value,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Header />
      <Center>
        <Text className={styles.title}>Login</Text>
      </Center>
      <Center pt={5}>
        <Flex
          display={"table-column"}
          background="green.200"
          p={7}
          rounded={10}
        >
          <FormControl isInvalid={mobileInput.isError || passwordInput.isError}>
            <FormLabel>User Mobile</FormLabel>
            <Input
              type="text"
              value={mobileInput.value}
              onChange={(e) =>
                setMobileInput({ value: e.target.value, isError: false })
              }
            />
            {mobileInput.isError && (
              <FormErrorMessage>Mobile is required.</FormErrorMessage>
            )}
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={passwordInput.value}
              onChange={(e) =>
                setpasswordInput({ value: e.target.value, isError: false })
              }
            />
            {passwordInput.isError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button
            disabled={loading}
            mt={2}
            colorScheme="green"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Flex>
      </Center>
    </div>
  );
}

export default Login;
