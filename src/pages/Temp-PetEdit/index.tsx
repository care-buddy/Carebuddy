import React, { useState,  } from 'react';
import styled from 'styled-components';

// 컴포넌트
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import PetRegister from '@/components/PetRegister/PetRegister';

export interface FormData {
  name: string;
  age: number;
  weight: number;
  gender: string;
  species: string;
  neutered: string;
}

const TempPetEdit: React.FC = () => {
  // 모달 관련 상태 관리
  const [modalOpen, setModalOpen] = useState(false);

  // 모달 관련 함수
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = () => {
    // console.log('Form data:', formData);
    // 모달 닫기
    handleCloseModal();
  };

  return (
    <Body>
      <Main>
        <Button onClick={handleOpenModal}>동물 수정 모달용 버튼</Button>
        {modalOpen && (
          <Modal
            onClose={handleCloseModal}
            title="동물 정보 수정"
            value="수정"
            component={
              <PetRegister
                // formData={formData}
                // setFormData={setFormData}
              />
            }
            onHandleClick={handleFormSubmit}
          />
        )}
      </Main>
    </Body>
  );
};

export default TempPetEdit;

/* 임시 레이아웃 */

const Body = styled.div`
  flex: 1;
  padding-top: 80px;
`;

const Main = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 1024px;
`;

/* 임시 레이아웃 끝 */
