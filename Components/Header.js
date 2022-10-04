import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import {
  logout,
  selectUserSession,
  saveusertoken,
  login as LoginUser,
} from "../Components/userSession/userSessionSlice";

function Header() {
  const userSession = useAppSelector(selectUserSession);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const blogslug = router.asPath;

  useEffect(() => {
    const localtoken = localStorage.getItem("token");
    if (localtoken == userSession.token) return;
    dispatch(saveusertoken(localtoken));
    dispatch(LoginUser());
  }, [userSession.token, dispatch]);

  return (
    <Flex p={"4"} minWidth="max-content" alignItems="center" gap="2">
      <Box
        className={styles.blogdiv}
        as="button"
        onClick={() => {
          router.push(`/`);
        }}
      >
        <Text className={styles.headerTitle}>Webby Blog</Text>
      </Box>

      <Spacer />

      <Box
        className={styles.blogdiv}
        w="70px"
        as="button"
        onClick={() => {
          router.push(`/`);
        }}
      >
        <Text
          className={blogslug == "/" ? styles.subtitleActive : styles.subtitle}
        >
          Home
        </Text>
      </Box>

      {userSession.islogin && (
        <Box
          className={styles.blogdiv}
          w="70px"
          as="button"
          onClick={() => {
            router.push(`/blogs`);
          }}
        >
          <Text
            className={
              blogslug == "/blogs" ? styles.subtitleActive : styles.subtitle
            }
          >
            Blogs
          </Text>
        </Box>
      )}

      <Box
        className={styles.blogdiv}
        w="70px"
        as="button"
        onClick={() => {
          router.push(`/about`);
        }}
      >
        <Text
          className={
            blogslug == "/about" ? styles.subtitleActive : styles.subtitle
          }
        >
          About
        </Text>
      </Box>

      {!userSession.islogin ? (
        <>
          <Box
            className={styles.blogdiv}
            w="70px"
            as="button"
            onClick={() => {
              router.push(`/login`);
            }}
          >
            <Text
              className={
                blogslug == "/login" ? styles.subtitleActive : styles.subtitle
              }
            >
              Login
            </Text>
          </Box>
          <Box
            className={styles.blogdiv}
            w="70px"
            as="button"
            onClick={() => {
              router.push(`/register`);
            }}
          >
            <Text
              className={
                blogslug == "/register"
                  ? styles.subtitleActive
                  : styles.subtitle
              }
            >
              Register
            </Text>
          </Box>
        </>
      ) : (
        <Box
          className={styles.blogdiv}
          w="70px"
          as="button"
          onClick={() => {
            dispatch(logout());
            router.push(`/login`);
          }}
        >
          <Text className={styles.subtitle}>Logout</Text>
        </Box>
      )}
    </Flex>
  );
}

export default Header;
