import {
    Td,
    Text,
    Tr,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import React from "react";
  import UpdateCategory from "./UpdateCategory";

  
  function CategoryDetailsRow(props) {
    const { name, slug, id, date, isLast, refetch } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
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
  