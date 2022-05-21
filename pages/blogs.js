import React, { useState, useEffect, useCallback } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
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
  Spinner,
  useMediaQuery,
  SimpleGrid,
  Button,
  Spacer,
  Container,
} from "@chakra-ui/react";
import BlogPost from "../Components/BlogPost";
import theme from "../Components/theme";

export default function Home({ blogs }) {
  const [isLargerThan1540] = useMediaQuery("(max-width: 1540px)");

  const initState = blogs;
  const initPage = 0;

  const [blogslist, setBlogslist] = useState(initState);
  const [page, setPage] = useState(initPage);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const { data } = await client.query({
      query: gql`
        query {
          blogs(start: ${page}, limit: 6, setting_language_slug: "en") {
            blog_id
            blog_description
            blog_title
            blog_media
            blog_slug
          }
        }
      `,
    });

    setBlogslist(data.blogs);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Webby Blog | Blogs</title>
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
            <Text className={styles.title}>My Life. My Blog.</Text>
          </Box>
        </Center>
      ) : (
        <Box bg={"white"} py="4" px={"8"}>
          <Text className={styles.title}>My Life. My Blog.</Text>
        </Box>
      )}

      <Center pt={"65px"}>
        <Flex flexDirection={"column"}>
          {loading &&  <Box w={(isLargerThan1540) ? '250px' : '1200px'} h='600px' >
               <Center>
                  <Spinner
                
                thickness="4px"
                color={theme.colors.main}
                size="xl"
              />
               </Center>
               
              </Box>}
          <SimpleGrid columns={[1, 2, 3]} spacing="60px">
            {!loading &&
              (blogslist.map((blog, index) => {
                return (
                  <Box key={blog.blog_id} pt={index % 2 === 0 ? "0" : "30px"}>
                    <BlogPost
                      title={blog.blog_title}
                      description={blog.blog_description}
                      slug={blog.blog_slug}
                    />
                  </Box>
                );
              })
            )}
          </SimpleGrid>

          <Flex pt={"5"} gap={"6"}>
            <Spacer />
            {!(page == 0) && (
              <Button
                onClick={() => setPage(page - 1)}
                colorScheme="orange"
                variant="outline"
              >
                Prev
              </Button>
            )}
            <Button
              disabled={blogslist.length < 6}
              onClick={() => setPage(page + 1)}
              colorScheme="orange"
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Center>

      <footer className={styles.footer}>Copyright 2022 Ahmad Hazim</footer>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        blogs(start: 0, limit: 6, setting_language_slug: "en") {
          blog_id
          blog_description
          blog_title
          blog_media
          blog_slug
        }
      }
    `,
  });

  return {
    props: {
      blogs: data.blogs,
    },
  };
}

export const client = new ApolloClient({
  uri: "https://graph-api-test.webby.asia/graphql",
  cache: new InMemoryCache(),
});
