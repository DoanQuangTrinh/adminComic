import {
    Td,
    Text,
    Tr,
    useColorModeValue,
    FormControl,
    IconButton  
  } from "@chakra-ui/react";
  import React from "react";
  import { FaComments } from "react-icons/fa";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  function CommentsChapterChildRow(props) {
    const history = useHistory()
    const {id, name, email,content, date, isLast, totalComment,totalLike,refetch } = props;
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
  
  export default CommentsChapterChildRow;
  