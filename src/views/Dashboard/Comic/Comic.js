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
  import ComicRow from "components/Comic/ComicRow";
  import React, { useState, useEffect } from "react";
  import AddCategory from "components/Category/AddCategory";
  import Loading from "components/Layout/Loading";
  import { checkLogin, logout, getToken } from "../../../utils/authentication";
  import { TablePagination } from "@trendmicro/react-paginations";
  import { initialFilter } from "utils/constant";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  
  function Comic() {
    const getDay = (date) => {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return day + "/" + month + "/" + year;
    };
    const history = useHistory()
    const comicApi = ROOT_API + API_ROUTES.COMIC_API
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
    const onRegisterClose = onClose;
    const [comic, setComic] = useState([]);
    const [filter, setFilter] = useState(initialFilter);
    const isLoggedIn = checkLogin();
    const handelCloseModal = () => {
        onRegisterClose()
      }
    const [{ data, loading, error }, refetch] = useAxios({
      url: comicApi,
      params: filter,
    });
    useEffect(() => { 
      if (!isLoggedIn) {
        return history.push("/auth/signin");
      }
      if (data == undefined) {
        refetch;
      }
      setComic(data?.data);
    }, [isLoggedIn, data, setComic]);
    comic.map((arr,index) => {
      console.log(arr.categories)
    })
    return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Category
            </Text>
            <Button
            variant="primary"
            maxH="30px"
            m="10px"
            onClick={onRegisterOpen}
          >
            Add
          </Button>
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
                        Name
                      </Th>
                      <Th borderColor={borderColor} paddingLeft="84px" color="gray.400">
                        Total Comment
                      </Th>
                      <Th borderColor={borderColor} paddingLeft="90px" color="gray.400">
                        Total Like
                      </Th>
                      <Th pl="24px" textAlign="center" borderColor={borderColor} color="gray.400">
                        categories
                      </Th>
                      <Th pl="24px" textAlign="center" borderColor={borderColor} color="gray.400">
                        Status
                      </Th>
                      <Th pl="24px" textAlign="center" borderColor={borderColor} color="gray.400">
                        Hot
                      </Th>
                      <Th pl="24px" borderColor={borderColor} color="gray.400">
                        Date
                      </Th>
                      <Th borderColor={borderColor}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {comic?.map((row, index, arr) => {
                      return (
                        <ComicRow
                          isApproved={row.isApproved}
                          id={row._id}
                          categories={row.categories.name}
                          totalComment={row.totalComment === "" ? "no totalComment" : row.totalComment}
                          totalLike={row.totalLike}
                          date={getDay(row.createdAt)}
                          updatedAt={getDay(row.updatedAt)}
                          name={row.name}
                          ishot={row.isHot}
                          status={row.status}
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
  
  export default Comic;
  