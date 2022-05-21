import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import { client } from "../blogs";
import theme from "../../Components/theme";
import {
  Container,
  Flex,
  HStack,
  Center,
  Box,
  Text,
  Button,
  Skeleton,
  useMediaQuery
} from "@chakra-ui/react";
import styles from "../../styles/Blog.module.css";
import Header from "../../Components/Header";
import image7 from "../../public/image 7.png";
import image8 from "../../public/image 8.png";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

function BlogDetails() {
  const router = useRouter();
  const { blogslug } = router.query;
  const [blogDetails, setBlogDetails] = useState({});
  const [loading, setLoading] = useState(true);

  

  const [isLargerThan1540, setIsLargerThan1540] = useState(false);
  const [mediaQuery] = useMediaQuery("(max-width: 1540px)");

  useEffect(() => {
    if(mediaQuery !== isLargerThan1540){
      setIsLargerThan1540(mediaQuery);
    }
  }, [mediaQuery])


console.log(isLargerThan1540);
  const fetchBlog = useCallback(async () => {
    if (blogslug == undefined) return;
    console.log("servercall");
    const { data } = await client.query({
      query: gql`
         query{
	blog(blog_slug: "${blogslug}" setting_language_slug: "en"){
      blog_id
      blog_title
      blog_date
      blog_short_description
      blog_description
      blog_slug
      blog_created
      blog_updated
      blog_status
      blog_media
  }
}
          `,
    });

    setBlogDetails(data.blog);
    setLoading(false);
  }, [blogslug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Webby Blog | {blogDetails.blog_title}</title>
        <meta name="description" content="Made by Hazim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Center pt={"40px"}>
        <Flex flexDirection={(isLargerThan1540) ? 'column' : 'row'}>
          <Box pr={"3"} mb={"50px"}>
            {loading && (
              <Skeleton
                h="30px"
                mb="7"
                startColor={theme.colors.main}
                endColor={theme.colors.sub}
              />
            )}
            <Text className={styles.title}>{blogDetails.blog_title}</Text>
            <Container maxW="600px" p={0} m="0" ml={2}>
              {loading && (
                <Skeleton h="10px" mb="2" endColor={theme.colors.sub} />
              )}
              {loading && <Skeleton h="10px" endColor={theme.colors.sub} />}
              <Text className={styles.description}>
                {blogDetails.blog_description}
              </Text>
            </Container>

            <Box p={"2"} my="3">
              <Image alt="img" src={image7} />
            </Box>
            <Container maxW="600px" p={0} m="0" ml={2}>
              <Text className={styles.description}>
                Welcome to your blog post. Use this space to connect with your
                readers and potential customers in a way thats current and
                interesting. Think of it as an ongoing conversation where you
                can share updates about business, trends, news, and more.
              </Text>
            </Container>

            <Text my={6} className={styles.title}>
              Design with Ease
            </Text>

            <Container maxW="600px" p={0} m="0" ml={2}>
              <Text className={styles.description}>
                Every layout comes with the latest social features built in.
                Readers will be able to easily share posts on social networks
                like Facebook and Twitter, view how many people have liked a
                post, made comments and more. With Wix, building your online
                community has never been easier.
              </Text>
            </Container>
          </Box>
          <Box px={"5"} pt="2" background={theme.colors.sub} h="800px" maxW={'300px'}>
            <Center>
            <Box p={"2"}>
              <Image alt="img" src={image8} />
            </Box>
            </Center>
          
            <Text pb={3} className={styles.subtitle}>
              Hi, Thanks for reading!
            </Text>
            <Container h={"100px"} maxW="170px" p={0} m="0" ml={2}>
              {loading && (
                <Skeleton h="15px" mb="3" endColor={theme.colors.main} />
              )}
              <Text className={styles.shortdescription}>
                {blogDetails.blog_short_description}
              </Text>
            </Container>

            <Box mt={"310px"}>
              <Center>
                <Text mr="2" className={styles.shortdescription}>
                  Visit our
                </Text>
                <Box
                  as="button"
                  variant={"outline"}
                  className={styles.shortdescription}
                >
                  Links
                </Box>
              </Center>

              <Center>
                <HStack>
                  <Button colorScheme="facebook">
                    <FaFacebook />
                  </Button>
                  <Button colorScheme="twitter">
                    <FaTwitter />
                  </Button>
                  <Button colorScheme="linkedin">
                    <FaLinkedinIn />
                  </Button>
                  <Button colorScheme="whatsapp">
                    <FaWhatsapp />
                  </Button>
                </HStack>
              </Center>
            </Box>
          </Box>
          
        </Flex>
      </Center>

      <footer className={styles.footer}>Copyright 2022 Ahmad Hazim</footer>
    </div>
  );
}

export default BlogDetails;
