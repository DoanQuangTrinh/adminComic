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
    FormLabel,
    Switch 
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { TbListDetails } from "react-icons/tb";
  import { axiosPost,axiosGet } from "utils/api";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  function ComicRow(props) {
    const { categories,name, slug, id,ishot,isApproved,totalLike, date, isLast, totalComment,refetch } = props;
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
    const comicHot = async () => {
        
    const apiHot  = ROOT_API + API_ROUTES.COMIC_IS_HOT
    const data = {
        id:id
    } 
    try {
        const response = await axiosPost(
            apiHot,
            data
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
              error?.response?.data?.msg || "Update Hot Fail",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
    }
    const comicDone = async () => {
        const apiHot  = ROOT_API + API_ROUTES.COMIC_IS_PROVED
        try {
            const response = await axiosGet(`${apiHot}/${id}`)
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
                  error?.response?.data?.msg || "Update Proved Fail",
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
  
          <Td borderColor={borderColor} textAlign="center" borderBottom={isLast ? "none" : null}>
            <Text fontSize="md"  w="220px" textAlign="center" color={textColor} fontWeight="bold">
              {totalComment}
            </Text>
          </Td>
          <Td borderColor={borderColor} textAlign="center" borderBottom={isLast ? "none" : null}>
            <Text fontSize="md"  w="220px" textAlign="center" color={textColor} fontWeight="bold">
              {totalLike}
            </Text>
          </Td>
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {categories}
            </Text>
          </Td>
        <Td borderColor={borderColor}  borderBottom={isLast ? "none" : null}>
            <FormControl display='flex' justifyContent="center" alignItems='center'>
                <Switch id='' isChecked={isApproved} onChange={comicDone}  />
            </FormControl>
        </Td>
        <Td borderColor={borderColor}  borderBottom={isLast ? "none" : null}>
            <FormControl display='flex' justifyContent="center" alignItems='center'>
                <Switch id='' isChecked={ishot} onChange={comicHot}/>
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
        {/* {isRegisterOpen && <UpdateCategory
            id = {id}
            refetch={refetch}
            isOpen={isRegisterOpen}
            onOpen={onRegisterOpen}
            onClose={handelCloseModal}
        />} */}
      </>
    );
  }
  
  export default ComicRow;
  