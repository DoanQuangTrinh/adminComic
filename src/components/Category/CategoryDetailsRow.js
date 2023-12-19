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
    useToast
  } from "@chakra-ui/react";
  import React from "react";
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { TbListDetails } from "react-icons/tb";
  import UpdateCategory from "./UpdateCategory";
  import { axiosPost } from "utils/api";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

  
  function CategoryDetailsRow(props) {
    const { name, slug, id, date, isLast, refetch } = props;
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
              {slug}
            </Text>
          </Td>
  
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {id}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {date}
            </Text>
          </Td>
  
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        </Td>
          
        </Tr>
        {isRegisterOpen && <UpdateCategory
            id = {id}
            refetch={refetch}
            isOpen={isRegisterOpen}
            onOpen={onRegisterOpen}
            onClose={handelCloseModal}
        />}
      </>
    );
  }
  
  export default CategoryDetailsRow;
  