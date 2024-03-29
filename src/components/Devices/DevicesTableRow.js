import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";

import { axiosPost } from "../../utils/api";

const deleteLinkApi =
  process.env.REACT_APP_API_HOST + process.env.REACT_APP_DELETE_URL;

function DevicesTableRow(props) {
  const { _id,  name, active, status, notes, location,  isLast } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const toast = useToast();

  function handleRowClick() {
    console.log("==========> create link <============ ");
  }

  function handleDeleteRowClick(){
    console.log("==========> DELETE <============ " + _id);
    let data = axiosPost(deleteLinkApi, {_id: _id});

    if (data?.data?.code == 0) {
      toast({
        title: "Thành Công",
        // description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Thất Bại",
        // description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    fetchData();
  };

  const fetchData = () => {
    props.refetch();
  };


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
            {location}
          </Text>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
          {active === true ? "Active" : "InActive"}
          </Text>
        </Flex>
      </Td>
      {/* <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" fontWeight="normal">
            {order}
          </Text>
        </Flex>
      </Td> */}
      {/* <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
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
          {status === true ? "Run" : "Done"}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {notes}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Button
          p="0px"
          bg="transparent"
          variant="no-effects"
          onClick={handleRowClick}
        >
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            Edit
          </Text>
        </Button>
      </Td>

      {/* <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Button
          p="0px"
          // bg="red.400"
          variant="warning"
          onClick={handleDeleteRowClick}
        >
          Delete
        </Button>
      </Td> */}
    </Tr>
  );
}

export default DevicesTableRow;
