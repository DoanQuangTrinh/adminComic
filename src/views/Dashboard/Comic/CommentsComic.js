import {
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
  import CommentsComicRow from "components/Comic/CommentsComicRow";
  import React, { useState, useEffect } from "react";
  import AddCategory from "components/Category/AddCategory";
  import Loading from "components/Layout/Loading";
  import { checkLogin, logout, getToken } from "../../../utils/authentication";
  import { TablePagination } from "@trendmicro/react-paginations";
  import { initialFilter } from "utils/constant";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  import moment from "moment";
  import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

  function CommentsComic() {
    const comicCmtApi = ROOT_API + API_ROUTES.COMMENTS_COMIC
    const location = useLocation();
    const spliceCmtCommic = location.pathname.match(/\/commentscomic\/([^/]+)\//);
    const idCmtComic = spliceCmtCommic[1]
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
        url: `${comicCmtApi}/${idCmtComic}`,
        params:{...filter}
    });
      const comicCmtData = data?.data
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
  
    return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Comments Comic
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
                      <Th pl="24px" borderColor={borderColor} color="gray.400">
                        Date
                      </Th>
                      <Th borderColor={borderColor}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {comicCmtData?.map((row, index, arr) => {
                      return (
                        <CommentsComicRow
                          id={row?._id}
                          date={moment(row.createdAt).format('DD-MM-YYYY')}
                          updatedAt={moment(row.updatedAt).format('DD-MM-YYYY')}
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
  
  export default CommentsComic;
  