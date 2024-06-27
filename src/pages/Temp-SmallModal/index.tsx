import React, { useState  } from 'react';
import styled from 'styled-components';

// 컴포넌트
import Button from '@/components/common/Button';
import SmallModal from '@/components/common/SmallModal';
import PetRegister from '@/components/PetRegister/PetRegister';

const TempSmallModal: React.FC = () => {
  // 모달 관련 상태 관리
  const [modalOpen, setModalOpen] = useState(false);

  // 모달 관련 함수
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  return (
    <Body>
      <Main>
        <Button onClick={handleOpenModal}>SmallModal 테스트용 버튼</Button>
        {modalOpen && (
          <SmallModal
            onClose={handleCloseModal}
            component={
              <PetRegister
                // formData={formData}
                // setFormData={setFormData}
              />
            }
          />
        )}
      </Main>
    </Body>
  );
};

export default TempSmallModal;

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
