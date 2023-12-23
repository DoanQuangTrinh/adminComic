import {
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
  import UpdateCategory from "./UpdateCategory";
  import { axiosPost } from "utils/api";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  import Comic from "views/Dashboard/Comic/Comic";
  function CategoryRow(props) {
    const { name, slug, id, date, isLast, refetch } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
    const onRegisterClose = onClose;
    const toast = useToast()
    const deleteCategory = ROOT_API + API_ROUTES.CATEGORY_DELETE_API
    function handleRowClick(id) {
      onOpen();
    }
    const handelCloseModal = () => {
        onRegisterClose()
      }
      const handleDelete = async () => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa không?");
  
        if (!confirmDelete) {
          return;
        }
  
        const deleteId = {
          id: id
        }
        try {
          const response = await axiosPost(
            deleteCategory,
            deleteId
          )
          if (response.data.code === 0) {
            toast({
              title: response.data.msg,
              duration: 9000,
            })
            refetch();
          }
        }
        catch (error) {
          console.log(error)
          toast({
            title:
              error?.response?.data?.errors?.errors[0]?.msg ||
              error?.response?.data?.msg || "Delete Group Fail",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
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
              {date}
            </Text>
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
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
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        </Td>
          
        </Tr>
        {isRegisterOpen && <UpdateCategory
            id = {id}
            name1 = {name}
            refetch={refetch}
            isOpen={isRegisterOpen}
            onOpen={onRegisterOpen}
            onClose={handelCloseModal}
        />}
      </>
    );
  }
  
  export default CategoryRow;
  