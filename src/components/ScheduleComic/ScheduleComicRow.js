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
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  function ScheduleComicRow(props) {
    const { title,content, error,dates, id, date, isLast, refetch } = props;
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
              {title}
            </Text>
          </Td>
  
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {dates}
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
  
  
          {/* <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <IconButton
            p={2}
            bg="transparent"
            onClick={handleRowClick}
            
          >
            <EditIcon />
          </IconButton>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <IconButton
            p={2}
            bg="transparent"
            onClick={() => {
                handleDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Td> */}
        {/* <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <IconButton
            p={2}
            bg="transparent"
            onClick={() => {
                handleCategoryDetails();
            }}
          >
            <TbListDetails />
          </IconButton>
        </Td> */}
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        </Td>
          
        </Tr>
      </>
    );
  }
  
  export default ScheduleComicRow;
  