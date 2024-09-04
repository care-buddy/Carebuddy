import React from 'react';
import { SearchWrapper, Text } from '@/pages/Info/info-components';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';

import { CityOptions, DistrictOptions } from './area';

const SearchBox: React.FC<{
  onSearch: () => void;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  //   selectedDistrict: string;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  onSearch,
  selectedCity,
  setSelectedCity,
  //   selectedDistrict,
  setSelectedDistrict,
}) => (
  <SearchWrapper>
    <Text>지역: </Text>
    <Select
      options={CityOptions}
      onChange={(e) => setSelectedCity(e.target.value)}
    />
    <Select
      options={DistrictOptions[selectedCity]}
      onChange={(e) => setSelectedDistrict(e.target.value)}
    />
    <Button buttonStyle="square-green" onClick={onSearch}>
      검색
    </Button>
  </SearchWrapper>
);

export default SearchBox;
