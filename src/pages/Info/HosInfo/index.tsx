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
import axiosInstance from '@/utils/axiosInstance';
import loadingState from '@/recoil/atoms/loadingState';
import errorState from '@/recoil/atoms/errorState';
import { useRecoilState } from 'recoil';
import { CityOptions, DistrictOptions } from '../area';

interface DataItem {
  _id: string;
  name: string;
  address: string;
  telephone: string;
}

const HosInfo: React.FC = () => {
  const headers = [
    { value: 'name', label: '병원명' },
    { value: 'telephone', label: '전화번호' },
    { value: 'address', label: '주소' },
  ];
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [isError, setError] = useRecoilState(errorState);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    if (selectedCity !== '') {
      fetchSearchData(currentPage, selectedCity, selectedDistrict);
    } else {
      fetchPaginatedData(currentPage);
    }
  }, [currentPage]);

  const fetchPaginatedData = async (page: number) => {
    try {
      const response = await axiosInstance.get(`search/AllH?page=${page}`);

      const itemsPerPage = response.data.message.perPage;

      const totalDataCount = response.data.message.totalPage;
      const totalPages = Math.ceil(totalDataCount / itemsPerPage);

      setData(response.data.message.datas);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchSearchData(1, selectedCity, selectedDistrict);
  };

  const fetchSearchData = async (
    page: number,
    city: string,
    district: string
  ) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `search/hospitals?address=${city} ${district}&page=${page}`
      );
      const { hospitals } = response.data;
      console.log(hospitals);

      setData(hospitals.datas);
      setTotalPages(hospitals.totalPage);
      setLoading(false);
    } catch (error) {
      setError(error as Error);

      console.error('Error fetching data:', error);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
  };

  return (
    <>
      <TopBar category="정보" title="동물 병원 검색" />
      <Wrapper>
        <BorderWrapper>
          <Title>동물 병원 검색</Title>
          <SearchWrapper>
            <Text>지역: </Text>
            <Select options={CityOptions} onChange={handleCityChange} />
            <Select
              options={DistrictOptions[selectedCity]}
              onChange={handleDistrictChange}
            />
            <Button buttonStyle="square-green" onClick={handleSearch}>
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
            telephone: item.telephone ? item.telephone : '',
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
