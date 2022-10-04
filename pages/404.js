import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../Components/Header";
import styles from "../styles/Home.module.css";
import image2 from "../public/image 2.png";
import image3 from "../public/image 3.png";
import image4 from "../public/image 4.png";
import {
  Flex,
  Center,
  Box,
  Text,
  useMediaQuery,
  Container,
} from "@chakra-ui/react";

export default function Page404() {
  const [isLargerThan1540] = useMediaQuery("(max-width: 1540px)");

  return (
    <div className={styles.container}>
      <Head>
        <title>Webby Blog | 404</title>
        <meta name="description" content="Made by Hazim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Center>
        <Flex>
          {!isLargerThan1540 && (
            <Box p={"2"}>
              <Image alt="img" src={image3} />
            </Box>
          )}

          <Box p={"2"}>
            <Image alt="img" src={image2} />
          </Box>
          {!isLargerThan1540 && (
            <Box p={"2"}>
              <Image alt="img" src={image4} />
            </Box>
          )}
        </Flex>
      </Center>
      {!isLargerThan1540 ? (
        <Center>
          <Box position={"absolute"} top="410px" bg={"white"} py="4" px={"8"}>
            <Text className={styles.title}>404</Text>
          </Box>
        </Center>
      ) : (
        <Box bg={"white"} py="4" px={"8"}>
          <Text className={styles.title}>404</Text>
        </Box>
      )}

      <Center mt={"130px"}>
        <Container>
          <Text mb={6} className={styles.title2} textAlign={"center"}>
            The page you looking is gone
          </Text>

          <Text textAlign={"center"}>get some help</Text>
        </Container>
      </Center>

      <footer className={styles.footer}>Copyright 2022 Ahmad Hazim</footer>
    </div>
  );
}
