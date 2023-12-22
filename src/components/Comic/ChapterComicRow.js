import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
  IconButton,
  useToast,
  FormControl,
  Switch 
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaComments } from "react-icons/fa";
function ChapterComicRow(props) {
  const { name,status, id, date, isLast, totalComment,totalLike } = props;
  const history = useHistory()
  const textColor = useColorModeValue("gray.500", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  const handleCommentsComic = () => {
    history.push(`/admin/commentschapter/${id}/commentschapter`);
  };
  return (
    <>
      <Tr>
        
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {name}
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
            {id}
          </Text>
        </Td>
        <Td borderColor={borderColor}  borderBottom={isLast ? "none" : null}>
            <FormControl display='flex'  alignItems='center'>
                <Switch id='' isChecked={status} />
            </FormControl>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {date}
          </Text>
        </Td>

      <Td borderColor={borderColor} pl="80px" borderBottom={isLast ? "none" : null}>
        <IconButton
          p={2}
          bg="transparent"
          onClick={() => {
            handleCommentsComic();
          }}
        >
          <FaComments />
        </IconButton>
      </Td>
      </Tr>
    </>
  );
}

export default ChapterComicRow;
