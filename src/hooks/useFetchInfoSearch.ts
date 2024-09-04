import errorState from '@/recoil/atoms/errorState';
import loadingState from '@/recoil/atoms/loadingState';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface DataItem {
  _id: string;
  name: string;
  address: string;
  telephone: string;
}

const useFetchInfoSearch = (allEndpoint: string, searchEndpoint: string) => {
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
      const response = await axiosInstance.get(
        `search/${allEndpoint}?page=${page}`
      );

      setData(response.data.message.datas);
      setTotalPages(response.data.message.totalPage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      console.error('Error fetching data:', error);
    }
  };

  const fetchSearchData = async (
    page: number,
    city: string,
    district: string
  ) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `search/${searchEndpoint}?address=${city} ${district}&page=${page}`
      );

      if (searchEndpoint === 'hospitals') {
        const { hospitals } = response.data;
        console.log(hospitals);

        setData(hospitals.datas);
        setTotalPages(hospitals.totalPage);
        setLoading(false);
      }
      if (searchEndpoint === 'pharmacies') {
        const { pharmacies } = response.data;
        console.log(pharmacies);

        setData(pharmacies.datas);
        setTotalPages(pharmacies.totalPage);
        setLoading(false);
      }
    } catch (error) {
      setError(error as Error);

      console.error('Error fetching data:', error);
    }
  };

  return {
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
  };
};

export default useFetchInfoSearch;
