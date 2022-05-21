import React from "react";
import styles from "../styles/Home.module.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import theme from "./theme";
import Image from "next/image";
import image6 from "../public/image 6.png";
import { useRouter } from "next/router";

function BlogPost({ title, description, slug }) {
  const router = useRouter();
  return (
    <Flex className={styles.blogdiv} direction={"column"}>
      <Box
        maxW="sm"
        bg={theme.colors.sub}
        p="3"
        onClick={() => {
          router.push(`/blogs/${slug}`);
        }}
      >
        <Image alt="img" src={image6} />
        <Text py="3" className={styles.blogTitle}>
          {title}
        </Text>

        <Box pb="4">
          <Text className={styles.blogDescription}>{description}</Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default BlogPost;
