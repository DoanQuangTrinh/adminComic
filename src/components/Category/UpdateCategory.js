import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import { axiosPost } from "utils/api";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  const UpdateCategory = ({id, isOpen, initialData, onUpdate, onClose,refetch }) => {
    const [editedData, setEditedData] = useState(initialData);
    const [name , setName] = useState("")
    const toast = useToast()
    useEffect(() => {
      setEditedData(initialData);
    }, [initialData]);
    const updateCategory = ROOT_API + API_ROUTES.CATEGORY_UPDATE_API
    const ClickUpdateCategory = async () => {
        const data = {
            id: id,
            name:name
        };
        try {
          const response = await axiosPost(updateCategory, data);
          if (response.data.code === 0) {
            toast({
              title: response.data.msg,
              status: "success",
              duration: 9000,
            });
            refetch();
            onClose();
          } else {
            toast({
              title: response.data.msg,
              status: "error",
              duration: 9000,
            });
          }
        } catch (error) {
          toast({
            title:
              error?.response?.data?.errors?.errors[0]?.msg ||
              error?.response?.data?.msg ||
              "Create Category Fail",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      };
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
              <FormLabel>ID</FormLabel>
              <Input
                name="id"
                value={id}
                />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter ComicId"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={ClickUpdateCategory}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default UpdateCategory;
  