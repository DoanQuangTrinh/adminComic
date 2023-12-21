// Chakra imports
import {
    Button,
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import useAxios from "axios-hooks";
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import CommentsChapterRow from "components/Comic/CommentsChapterRow";
  import React, { useState, useEffect } from "react";
  import AddCategory from "components/Category/AddCategory";
  import Loading from "components/Layout/Loading";
  import { checkLogin, logout, getToken } from "../../../utils/authentication";
  import { TablePagination } from "@trendmicro/react-paginations";
  import { initialFilter } from "utils/constant";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

  function CommentsChapter() {
    const chapterCommentsApi = ROOT_API + API_ROUTES.COMMENTS_CHAPTER
    const location = useLocation();
    const spliceCmtChapterUrl = location.pathname.match(/\/commentschapter\/([^/]+)\//);
    const idCmtChapter = spliceCmtChapterUrl[1]
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
    const onRegisterClose = onClose;
    const [filter, setFilter] = useState(initialFilter);
    const isLoggedIn = checkLogin();
    const handelCloseModal = () => {
        onRegisterClose()
      }
    const [{ data, loading, error }, refetch] = useAxios({
        url: `${chapterCommentsApi}/${idCmtChapter}`,
        params:{...filter}
    });
    const chapterCmtData = data?.data
    useEffect(() => { 
      if (!isLoggedIn) {
        return history.push("/auth/signin");
      }
     }, [isLoggedIn , data]);
    useEffect(() => {
      if (error) {
        return <Loading />;
      }
    }, [error]);
  
    const getDay = (date) => {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return day + "/" + month + "/" + year;
    };
  
    return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Comments Chapter
            </Text>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Table variant="simple" color={textColor}>
                  <Thead>
                    <Tr my=".8rem" pl="0px" color="gray.400">
                      <Th pl="24px" borderColor={borderColor} color="gray.400">
                        UserName
                      </Th>
                      <Th borderColor={borderColor} color="gray.400">
                        Email
                      </Th>
                      <Th borderColor={borderColor} color="gray.400">
                        Comments
                      </Th>
                      <Th borderColor={borderColor} color="gray.400">
                        totalComment
                      </Th>
                      <Th borderColor={borderColor} color="gray.400">
                        totalLike
                      </Th>
                      <Th borderColor={borderColor} color="gray.400">
                        Is Like
                      </Th>
                      <Th pl="24px" borderColor={borderColor} color="gray.400">
                        Date
                      </Th>
                      <Th borderColor={borderColor}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {chapterCmtData?.map((row, index, arr) => {
                      return (
                        <CommentsChapterRow
                          id={row?._id}
                          date={getDay(row?.createdAt)}
                          updatedAt={getDay(row?.updatedAt)}
                          name={row?.member?.username}
                          email={row?.member?.email}
                          totalLike={row?.totalLike}
                          content={row.content}
                          is_like={row?.is_like}
                          totalComment={row?.totalComment}
                          refetch={refetch}
                          isLast={index === arr.length - 1 ? true : false}
                        />
                      );
                    })}
                  </Tbody>
                </Table>
                <Flex justifyContent="flex-end">
                  <TablePagination
                    type="full"
                    page={data?.pagination?.page}
                    pageLength={data?.pagination?.pageSize}
                    totalRecords={data?.pagination?.count}
                    onPageChange={({ page, pageLength }) => {
                      console.log(page)
                      setFilter({
                        ...filter,
                        pageSize: pageLength,
                        pageIndex: page - 1
                      })
                    }}
                    prevPageRenderer={() => <i className="fa fa-angle-left" />}
                    nextPageRenderer={() => <i className="fa fa-angle-right" />}
                  />
                </Flex>
                {isRegisterOpen && <AddCategory
                refetch={refetch}
                isOpen={isRegisterOpen}
                onOpen={onRegisterOpen}
                onClose={handelCloseModal}
                />}
              </>
            )}
          </CardBody>
        </Card>
      </Flex>
    );
  }
  
  export default CommentsChapter;
  