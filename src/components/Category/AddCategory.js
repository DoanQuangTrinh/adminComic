import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  Button,
  Input,
  Checkbox,
  FormLabel,
  FormControl,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from "@chakra-ui/react";

import { axiosPost } from "../../utils/api";
import { getToken } from "utils/authentication";
import { API_ROUTES, ROOT_API } from "utils/constant";

const CreateCategory = ROOT_API + API_ROUTES.CATEGORY_ADD_API;
const AddCategory = ({ isOpen, onOpen, onClose, refetch }) => {
  const cancelRef = React.useRef();
  const [name , setname] = useState("")
  const [id, setId] = useState("");
  const toast = useToast();
  const [success, setSuccess] = useState(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {}, []);
  const [value, setValue] = useState();
  const clickCreateCategory = async () => {
    const subData = {
        comicId: id,
        name:name
    };
    try {
      const response = await axiosPost(CreateCategory, subData);
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
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Thông Tin Category</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel>ComicId</FormLabel>
              <Input
                type="text"
                placeholder="Enter ComicId"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </FormControl>

            {success && <p style={{ color: "green" }}>{success}</p>}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                clickCreateCategory();
              }}>
              Thêm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddCategory;
