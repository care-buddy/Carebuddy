import Table from '@/components/common/Table';
import TopBar from '@/components/common/TopBar';
import { Wrapper, BorderWrapper, Title } from '@/pages/Info/info-components';
import React from 'react';
import useFetchInfoSearch from '@/hooks/useFetchInfoSearch';
import SearchBox from './SearchBox';

const InfoTemplate: React.FC<{
  title: string;
  allEndpoint: string;
  searchEndpoint: string;
  headers: { value: string; label: string }[];
}> = ({ title, allEndpoint, searchEndpoint, headers }) => {
  const {
    data,
    isLoading,
    isError,
    currentPage,
    totalPages,
    setCurrentPage,
    selectedCity,
    setSelectedCity,
    selectedDistrict,
    setSelectedDistrict,
    fetchSearchData,
  } = useFetchInfoSearch(allEndpoint, searchEndpoint);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchSearchData(1, selectedCity, selectedDistrict);
  };

  return (
    <>
      <TopBar category="정보" title={title} />
      <Wrapper>
        <BorderWrapper>
          <Title>{title}</Title>
          <SearchBox
            onSearch={handleSearch}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            // selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
          />
        </BorderWrapper>
        <Table
          headers={headers}
          data={data.map((item) => ({
            name: item.name,
            address: item.address,
            telephone: item.telephone ? item.telephone : '',
          }))}
          isLoading={isLoading}
          isError={isError}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          hasPagination
        />
      </Wrapper>
    </>
  );
};

export default InfoTemplate;
