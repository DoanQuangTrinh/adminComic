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
  import ScheduleComicRow from "components/ScheduleComic/ScheduleComicRow";
  import React, { useState, useEffect } from "react";
  import AddCategory from "components/Category/AddCategory";
  import Loading from "components/Layout/Loading";
  import { checkLogin, logout, getToken } from "../../../utils/authentication";
  import { TablePagination } from "@trendmicro/react-paginations";
  import { initialFilter } from "utils/constant";
  import { API_ROUTES , ROOT_API } from "utils/constant";
  import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
  import moment from "moment";

  function ScheduleComic() {
    const history = useHistory()
    const categoryApi = ROOT_API + API_ROUTES.SCHEDULE_COMIC
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
    const onRegisterClose = onClose;
    const [schedule, setSchedule] = useState([]);
    const [filter, setFilter] = useState(initialFilter);
    const isLoggedIn = checkLogin();
    const handelCloseModal = () => {
        onRegisterClose()
      }
    const [{ data, loading, error }, refetch] = useAxios({
      url: `${categoryApi}`,
      params:filter
    });
    useEffect(() => { 
      if (!isLoggedIn) {
        return history.push("/auth/signin");
      }
      if (data == undefined) {
        refetch;
      }
      setSchedule(data?.data);
    }, [isLoggedIn, data, setSchedule]);
  
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
              Schedule Comic
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
                        Title
                      </Th>
                      <Th borderColor={borderColor} color="gray.400">
                        Date
                      </Th>

                    </Tr>
                  </Thead>
                  <Tbody>
                    {schedule?.map((row, index, arr) => {
                      return (
                        <ScheduleComicRow
                          id={row._id}
                          date={moment(row.createdAt).format('DD-MM-YYYY')}
                          updatedAt={moment(row.updatedAt).format('DD-MM-YYYY')}
                          title={row.title}
                          dates={row.date}
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
  
  export default ScheduleComic;
  