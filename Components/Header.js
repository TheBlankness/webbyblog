import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

function Header() {
  const router = useRouter();
  const blogslug = router.asPath;
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
        <Text className={blogslug == "/" ? styles.subtitleActive : styles.subtitle}>
          Home
        </Text>
      </Box>

      <Box
        className={styles.blogdiv}
        w="70px"
        as="button"
        onClick={() => {
          router.push(`/blogs`);
        }}
      >
        <Text className={blogslug == "/blogs" ? styles.subtitleActive : styles.subtitle}>Blogs</Text>
      </Box>

      <Box
        className={styles.blogdiv}
        w="70px"
        as="button"
        onClick={() => {
          router.push(`/about`);
        }}
      >
        <Text className={blogslug == "/about" ? styles.subtitleActive : styles.subtitle}>About</Text>
      </Box>
    </Flex>
  );
}

export default Header;
