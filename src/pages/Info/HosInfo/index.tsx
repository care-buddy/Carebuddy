import React from 'react';
import InfoTemplate from '../InfoTemplate';

const HosInfo: React.FC = () => (
  <InfoTemplate
    title="동물 병원 검색"
    allEndpoint="AllH"
    searchEndpoint="hospitals"
    headers={[
      { value: 'name', label: '병원명' },
      { value: 'telephone', label: '전화번호' },
      { value: 'address', label: '주소' },
    ]}
  />
);

export default HosInfo;
