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
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { TbListDetails } from "react-icons/tb";
  import { axiosPost } from "utils/api";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  
  function CommentsComicRow(props) {
    const { name,status,is_like, email,content, id, date, isLast, totalComment,totalLike,refetch } = props;
    const history = useHistory()
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
    const onRegisterClose = onClose;
    const toast = useToast()
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
  
          <Td borderColor={borderColor}  borderBottom={isLast ? "none" : null}>
              <FormControl display='flex'  alignItems='center'>
                  <Switch id='' isChecked={is_like} />
              </FormControl>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {date}
            </Text>
          </Td>
  
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        </Td>
          
        </Tr>
      </>
    );
  }
  
  export default CommentsComicRow;
  