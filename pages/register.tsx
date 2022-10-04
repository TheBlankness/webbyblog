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

const SEND_USERDETAILS = gql`
  mutation RegisterUser(
    $user_fullname: String!
    $user_email: String!
    $user_mobile: String!
    $password: String!
  ) {
    register(
      input: {
        user_fullname: $user_fullname
        user_email: $user_email
        user_mobile: $user_mobile
        password: $password
      }
    )
  }
`;

function Register() {
  const router = useRouter();
  const [fullName, setfullName] = useState({
    value: "",
    isError: false,
  });
  const [email, setemail] = useState({
    value: "",
    isError: false,
  });
  const [mobileInput, setMobileInput] = useState({
    value: "",
    isError: false,
  });
  const [passwordInput, setpasswordInput] = useState({
    value: "",
    isError: false,
  });
  const [RegisterUser, { data, loading, error }] =
    useMutation(SEND_USERDETAILS);

  useEffect(() => {
    if (data === undefined) return;
    console.log(data);
    router.push(`/login`);
  }, [data, router]);

  useEffect(() => {
    if (error === undefined) return;
    console.log(error);
  }, [error]);

  const handleRegister = () => {
    if (fullName.value == "") {
      setfullName({ value: fullName.value, isError: true });
      return;
    }
    if (email.value == "") {
      setemail({ value: email.value, isError: true });
      return;
    }
    if (mobileInput.value == "") {
      setMobileInput({ value: mobileInput.value, isError: true });
      return;
    }
    if (passwordInput.value == "") {
      setpasswordInput({ value: passwordInput.value, isError: true });
      return;
    }

    RegisterUser({
      variables: {
        user_fullname: fullName.value,
        user_email: email.value,
        user_mobile: mobileInput.value,
        password: passwordInput.value,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Header />
      <Center>
        <Text className={styles.title}>Register</Text>
      </Center>
      <Center pt={5}>
        <Flex
          display={"table-column"}
          background="green.200"
          p={7}
          rounded={10}
        >
          <FormControl
            isInvalid={
              fullName.isError ||
              email.isError ||
              mobileInput.isError ||
              passwordInput.isError
            }
          >
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={fullName.value}
              onChange={(e) =>
                setfullName({ value: e.target.value, isError: false })
              }
            />
            {fullName.isError && (
              <FormErrorMessage>Full Name is required.</FormErrorMessage>
            )}
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email.value}
              onChange={(e) =>
                setemail({ value: e.target.value, isError: false })
              }
            />
            {email.isError && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
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
            onClick={handleRegister}
          >
            Register
          </Button>
        </Flex>
      </Center>
    </div>
  );
}

export default Register;
