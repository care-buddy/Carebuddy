import React from 'react';
import InfoTemplate from '../InfoTemplate';

const PharInfo: React.FC = () => (
  <InfoTemplate
    title="동물 약국 검색"
    allEndpoint="AllP"
    searchEndpoint="pharmacies"
    headers={[
      { value: 'name', label: '약국명' },
      { value: 'telephone', label: '전화번호' },
      { value: 'address', label: '주소' },
    ]}
  />
);

export default PharInfo;
