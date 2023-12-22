import {
    Td,
    Text,
    Tr,
    useColorModeValue,
    IconButton,
  } from "@chakra-ui/react";
  import React from "react";
  import { ExternalLinkIcon } from "@chakra-ui/icons";
  import { API_WEB_TRUYEN } from "utils/constant";
  function ReportChapterRow(props) {
    const { nameSlug,slug , name,chuong,memberReport,content, error,nameComic, id, date, isLast, refetch } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const Link = API_WEB_TRUYEN + `/truyen-tranh/${nameSlug}/${slug}`
    return (
      <>
        <Tr>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {nameComic}
            </Text>
          </Td>
  
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {error}
            </Text>
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {content}
            </Text>
          </Td>
  
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {chuong}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {memberReport}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {date}
            </Text>
          </Td>
       
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <a href={Link} target="_blank" rel="noopener noreferrer">
          <IconButton
            p={2}
            bg="transparent"
          >
            <ExternalLinkIcon />
          </IconButton>
          </a>
        </Td>
        </Tr>
      </>
    );
  }
  
  export default ReportChapterRow;
  