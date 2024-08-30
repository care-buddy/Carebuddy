import React, { useState, useEffect } from 'react';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Table from '@/components/common/Table';
import TopBar from '@/components/common/TopBar';
import {
  Wrapper,
  BorderWrapper,
  Title,
  SearchWrapper,
  Text,
} from '@/pages/Info/info-components';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';

// UI확인용 임시데이터
const SelectDummyCityOptions = [
  { value: '', label: '시/도 선택' },
  { value: '서울특별시', label: '서울특별시' },
  { value: '부산광역시', label: '부산광역시' },
  { value: '인천광역시', label: '인천광역시' },
  { value: '대구광역시', label: '대구광역시' },
  { value: '대전광역시', label: '대전광역시' },
  { value: '광주광역시', label: '광주광역시' },
  { value: '울산광역시', label: '울산광역시' },
  { value: '세종특별자치시', label: '세종특별자치시' },
  { value: '경기도', label: '경기도' },
  { value: '충청북도', label: '충청북도' },
  { value: '충청남도', label: '충청남도' },
  { value: '전라남도', label: '전라남도' },
  { value: '경상북도', label: '경상북도' },
  { value: '경상남도', label: '경상남도' },
  { value: '강원특별자치도', label: '강원특별자치도' },
  { value: '전북특별자치도', label: '전북특별자치도' },
  { value: '제주특별자치도', label: '제주특별자치도' },
];

interface DataItem {
  _id: string;
  name: string;
  address: string;
  telephone: string;
}

const HosInfo: React.FC = () => {
  // 테이블에 표시할 데이터 예시 및 임시 상태
  // const headers = ['name', 'address', 'telephone'];
  const headers = [
    { value: 'name', label: '병원명' },
    { value: 'telephone', label: '전화번호' },
    { value: 'address', label: '주소' },
  ];
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // API 구현 후 수정합니다. 지금은 테이블 컴포넌트 확인 용 임시 함수 사용
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      setIsError(false);

      try {
        // 예시로 페이징된 데이터를 시뮬레이션하기 위해 임의의 함수를 사용합니다.
        const { data: fetchedData, totalPages: fetchedTotalPages } =
          await fetchPaginatedData(currentPage);
        setData(fetchedData);
        setTotalPages(fetchedTotalPages);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  // 페이징된 데이터를 시뮬레이션하는 함수. API 구현 후 수정합니다.
  const fetchPaginatedData = async (page: number) => {
    // 실제로는 여기서 API를 호출하여 페이징된 데이터를 가져올 수 있습니다.
    // 이 예시에서는 임의의 데이터를 반환합니다.
    // const itemsPerPage = 2; // 한 페이지당 보여줄 항목 수
    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedData: DataItem[] = [
    //   { ID: '1', Name: 'John Doe', Age: '30', City: 'New York' },
    //   { ID: '2', Name: 'Jane Smith', Age: '25', City: 'Los Angeles' },
    //   { ID: '3', Name: 'Mike Johnson', Age: '40', City: 'Chicago' },
    //   { ID: '4', Name: 'Emily Brown', Age: '35', City: 'San Francisco' },
    // ].slice(startIndex, endIndex);

    // const totalDataCount = 4; // 예시 데이터 전체 개수
    // const totalPages = Math.ceil(totalDataCount / itemsPerPage);

    // return { data: paginatedData, totalPages };
    try {
      const response = await axiosInstance.get(`search/AllH?page=${page}`);
      console.log(response);
      const itemsPerPage = response.data.message.perPage;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      // const paginatedData: DataItem[] = [
      //   { ID: '1', Name: 'John Doe', Age: '30', City: 'New York' },
      //   { ID: '2', Name: 'Jane Smith', Age: '25', City: 'Los Angeles' },
      //   { ID: '3', Name: 'Mike Johnson', Age: '40', City: 'Chicago' },
      //   { ID: '4', Name: 'Emily Brown', Age: '35', City: 'San Francisco' },
      // ].slice(startIndex, endIndex);
      // const paginatedData: DataItem[] = response.data.message.datas.map((data) => {
      //   {_id: data_id, name: data.name, address:data.address, telephone:data.telephone}
      // })
      const totalDataCount = response.data.message.totalPage;
      const totalPages = Math.ceil(totalDataCount / itemsPerPage);
      console.log(response.data.message.datas);
      return { data: response.data.message.datas, totalPages };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlesSearch = () => {
    // fetchSearchData();
  };
  // search/hospitals?address=${city} ${district}&page=${page}
  const fetchSearchData = async (page, city, district) => {
    try {
      const response = await axiosInstance.get(
        `search/hospitals?address=${city} ${district}&page=${page}`
      );
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCityChange = (e) => {};

  const fetchDataByPage = async () => {};

  return (
    <>
      <TopBar category="정보" title="동물 병원 검색" />
      <Wrapper>
        <BorderWrapper>
          <Title>동물 병원 검색</Title>
          <SearchWrapper>
            <Text>지역: </Text>
            <Select
              options={SelectDummyCityOptions}
              onChange={handleCityChange}
            />
            <Select options={SelectDummyCityOptions} />
            <Button buttonStyle="square-green" onClick={() => {}}>
              검색
            </Button>
          </SearchWrapper>
        </BorderWrapper>
        <Table
          headers={headers}
          // data={data} 이렇게 쓰는게 아니라 명시해줘야함
          data={data.map((item) => ({
            name: item.name,
            address: item.address,
            telephone: item.telephone,
          }))}
          isLoading={isLoading}
          isError={isError}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasPagination // 페이지네이션을 표시할지 여부를 설정
        />
      </Wrapper>
    </>
  );
};

export default HosInfo;
