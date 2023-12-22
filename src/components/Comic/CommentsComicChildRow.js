import {
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  function CommentsComicChildRow(props) {
    const { name, email,content, date, isLast, totalComment,totalLike,refetch } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (
      <>
        <Tr>
          
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {name}
            </Text>
          </Td>
  
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
                {email}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
                {content}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" pl="38px" color={textColor} fontWeight="bold">
              {totalComment}
            </Text>
          </Td>
  
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" pl="30px" color={textColor} fontWeight="bold">
              {totalLike}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {date}
            </Text>
          </Td>
          
        </Tr>
      </>
    );
  }
  
  export default CommentsComicChildRow;
  