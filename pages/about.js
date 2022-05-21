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

export default function About() {
  const [isLargerThan1540] = useMediaQuery("(max-width: 1540px)");

  return (
    <div className={styles.container}>
      <Head>
        <title>Webby Blog | About</title>
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
            <Text className={styles.title}>About Us</Text>
          </Box>
        </Center>
      ) : (
        <Box bg={"white"} py="4" px={"8"}>
          <Text className={styles.title}>About Us</Text>
        </Box>
      )}

      <Center mt={"130px"}>
        <Container mr="10px">
          <Text mb={6} className={styles.title2}>
            Instant Routing via Next.Js
          </Text>

          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Text>
        </Container>
        <Container ml="10px">
          <Text mb={6} className={styles.title2}>
            Data Caching handled by Apollo Client
          </Text>

          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Text>
        </Container>
      </Center>

      <footer className={styles.footer}>Copyright 2022 Ahmad Hazim</footer>
    </div>
  );
}
