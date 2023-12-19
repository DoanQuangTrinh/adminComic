import {
  Avatar,
  Badge,
  Button,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import UserDetailDialog from "./UserDetailDialog";
import { DeleteIcon, EditIcon, UnlockIcon } from "@chakra-ui/icons";
import UserResetPasswordDialog from "./UserResetPasswordDialog";


function UserRow(props) {
  const { userDetail, logo, id, name, email, phone, role, status, date, isLast, handelUpdateUser, refetch } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  function handleRowClickResetPassword() {
    onOpen();
  }

  function handleRowClick() {
    console.log("==========> ROY <============", userDetail);
    handelUpdateUser(userDetail)
  }

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  const timestampObj = new Date(date);
  const formattedDate = timestampObj.toLocaleDateString();
  return (
    <Tr>
      
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {role}
          </Text>
        </Flex>
      </Td>
      {/* 

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {role}
          </Text>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={status === "Online" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td> */}
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formattedDate}
        </Text>
      </Td>
      
      {/* <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <IconButton
          p={2}
          bg="transparent"
          onClick={() => {
            handleRowClick();
          }}
        >
          <EditIcon />
        </IconButton>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <IconButton
          p={2}
          bg="transparent"
          onClick={() => {
            handleRowClickResetPassword();
          }}
        >
          <UnlockIcon />
        </IconButton>
      </Td> */}
    </Tr>
  );
}

export default UserRow;
