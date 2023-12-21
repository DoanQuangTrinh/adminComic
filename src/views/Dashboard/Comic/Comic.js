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
    Stack ,
    InputGroup ,
    InputLeftAddon ,
    Input ,
    Select,
    FormLabel 
  } from "@chakra-ui/react";
  import axios from "axios";
  import useAxios from "axios-hooks";
  import { axiosGet } from "utils/api";
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
    const unorm = require('unorm');
    const history = useHistory()
    const comicApi = ROOT_API + API_ROUTES.COMIC_API
    const comicApiFilter = ROOT_API + API_ROUTES.COMIC_FILTER
    const categoryApi = ROOT_API + API_ROUTES.CATEGORY_API
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isRegisterOpen = isOpen;
    const onRegisterOpen = onOpen;
    const onRegisterClose = onClose;
    const [comic, setComic] = useState([]);
    const [filter, setFilter] = useState(initialFilter);
    const [dataFilter, setDatafilter] = useState()
    const isLoggedIn = checkLogin();
    const handelCloseModal = () => {
        onRegisterClose()
      }
    const [{ data, loading, error }, refetch] = useAxios({
      url: comicApi,
      params: filter 
    });
    useEffect(() => { 
      setComic(data?.data);
      setDatafilter(data)
    }, [data]);
    
  const clearFilter = () => {
    setComic(data?.data);
    setSearchKeywords("")
    setSelectedGenre("")
    setSelectedStatus("")
  }
    // const searchComic = async () => {
    //   try {
    //     const response = await axiosGet(comicApi)
    //   }
    //   catch(err){

    //   }
    // }
  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSearchKeywordsChange = (event) => {
    setSearchKeywords(event.target.value);
  };
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const convertToSlug = (inputString) => (
    unorm
      .nfkd(inputString)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
  );
  const handleButtonClick = async () => {
    const nameSlug = convertToSlug(selectedGenre)
    try {
      const response = await axios.get(comicApiFilter, {
        params: {
          categorySlug:nameSlug,
          searchKeyword: searchKeywords,
          ...filter
        },
      });
      setComic(response.data.data)
      setDatafilter(response.data)
    } catch (err) {
      console.error('Error:', err);
    }
  };
  const [categoryFilter,setCategoryFilter]= useState()
  const dataCategoryFilter = async () => {
    try {
      const response = await axios.get(categoryApi);
      setCategoryFilter(response.data.data)
    } catch (err) {
      console.error('Error:', err);
    }
  };
    useEffect(() => {
    dataCategoryFilter()
    handleButtonClick()
  },[refetch])
  
  
    return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Comic
            </Text>
          </CardHeader>
          <Flex flexWrap="wrap" marginBottom="30px">
        <Flex marginTop="10px" w="40%">
          <FormLabel w="16%" maxH="30px" m="10px" htmlFor="IP">
            Tìm kiếm
          </FormLabel>
          <Input
            placeholder="Tìm theo tên phim"
            w="79%"
            value={searchKeywords}
            onChange={handleSearchKeywordsChange}
          />
        </Flex>

        <Flex w="40%">
          <FormLabel maxH="30px" m="10px" paddingTop="7px" htmlFor="IP" w="18%">
            Thể loại
          </FormLabel>
          <Select
            placeholder="Chọn thể loại"
            maxH="30px"
            m="10px"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            {categoryFilter?.map((cate, index) => (
              <option key={index} value={cate.name}>
                {cate.name}
              </option>
            ))}
          </Select>
        </Flex>

        {/* <Flex w="40%">
          <FormLabel maxH="30px" m="10px" paddingTop="7px" htmlFor="IP" w="18%">
            Danh mục
          </FormLabel>
          <Select
            placeholder="Chọn danh mục"
            maxH="30px"
            m="10px"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
           
           {categoryFilter?.map((cate, index) => (
              <option key={index} value={cate.name}>
                {cate.name}
              </option>
            ))}
            
          </Select>
        </Flex> */}

        <Flex w="40%">
          <FormLabel maxH="30px" m="10px" paddingTop="7px" htmlFor="IP" w="18%">
            Trạng thái
          </FormLabel>
          <Select
            placeholder="Chọn trạng thái"
            maxH="30px"
            m="10px"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Select>
        </Flex>
      <Button marginTop="-45px" marginLeft="607px" w="90px" onClick={handleButtonClick}>Filter</Button>
      <Button marginTop="-45px" marginLeft="20px" w="100px" onClick={clearFilter}>Clear Filter</Button>
      </Flex>

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
                      <Th pl="24px" borderColor={borderColor} color="gray.400">
                        Comments Comic
                      </Th>
                      <Th pl="24px" borderColor={borderColor} color="gray.400">
                        View Chapter
                      </Th>
                      <Th borderColor={borderColor}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {comic?.map((row, index, arr) => {
                      return (
                        <ComicRow
                          id={row._id}
                          comic={comic}
                          categories={row.categories.map(category => category.name).join(', ')} 
                          isApproved={row.isApproved}
                          totalComment={row.totalComment === "" ? "no totalComment" : row.totalComment}
                          totalLike={row.totalLike}
                          date={getDay(row.createdAt)}
                          updatedAt={getDay(row.updatedAt)}
                          name={row.name}
                          slug={row.slug}
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
                    page={dataFilter?.pagination?.page}
                    pageLength={dataFilter?.pagination?.pageSize}
                    totalRecords={dataFilter?.pagination?.count}
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
  