import React, { useState } from 'react';

// 로그인 모달 테스트용
import SmallModal from '@/components/common/SmallModal';
import Login from '@/components/Login/Login';

// 동물 등록 모달 테스트용
// import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import PetRegister from '@/components/PetRegister/PetRegister';

// 동물 수정 모달 테스트용
// import Button from '@/components/common/Button';
// import Modal from '@/components/common/Modal';
// import PetRegister from '@/components/PetRegister/PetRegister';

// 일반 회원가입 모달 테스트용
// import Button from '@components/common/Button';
// import SmallModal from '@/components/common/SmallModal';
import BasicRegistration from '@/components/Registration/BasicRegistration';

// 카카오 회원가입 모달 테스트용
// import Button from '@components/common/Button';
// import SmallModal from '@/components/common/SmallModal';
import KakaoRegistration from '@/components/Registration/KaKaoRegistration';

// 아이디 찾기 모달 테스트용
// import Button from '@components/common/Button';
// import SmallModal from '@/components/common/SmallModal';
import ForgotEmail from '@/components/Recovery/ForgotEmail';

// 비밀번호 찾기 모달 테스트용
// import Button from '@components/common/Button';
// import SmallModal from '@/components/common/SmallModal';
import ForgotPassword from '@/components/Recovery/ForgotPassword';


// 함수 안
  // 로그인 모달 관련 상태&함수
  const [modalOpen1, setModalOpen1] = useState(false);

  const handleOpenModal1 = () => {
    setModalOpen1(true);
  };

  const handleCloseModal1 = () => {
    setModalOpen1(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 회원가입 모달 관련 상태&함수
  const [modalOpen4, setModalOpen4] = useState(false);

  const handleOpenModal4 = () => {
    setModalOpen4(true);
  };

  const handleCloseModal4 = () => {
    setModalOpen4(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 카카오 회원가입 모달 관련 상태&함수
  const [modalOpen5, setModalOpen5] = useState(false);

  const handleOpenModal5 = () => {
    setModalOpen5(true);
  };

  const handleCloseModal5 = () => {
    setModalOpen5(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 동물 등록 모달 관련 상태&함수
  const [modalOpen2, setModalOpen2] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });

  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  // const handleFormSubmit2 = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 동물 정보 수정 모달 관련 상태&함수
  const [modalOpen3, setModalOpen3] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });

  const handleOpenModal3 = () => {
    setModalOpen3(true);
  };

  const handleCloseModal3 = () => {
    setModalOpen3(false);
  };

  // const handleFormSubmit3 = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 이메일 찾기 모달 1
  const [modalOpen6, setModalOpen6] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });


  const handleOpenModal6 = () => {
    setModalOpen6(true);
  };

  const handleCloseModal6 = () => {
    setModalOpen6(false);
  };

  // const handleFormSubmit3 = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };


  // 패스워드 찾기 모달 1
  const [modalOpen7, setModalOpen7] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });

  const handleOpenModal7 = () => {
    setModalOpen7(true);
  };

  const handleCloseModal7 = () => {
    setModalOpen7(false);
  };

  // const handleFormSubmit3 = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

// JSX안
<TopBar category="반려동물 건강 관리 서비스" title="Carebuddy" />
<h1>모달 테스트 구역시작</h1>
{/* 로그인 */}
<Button onClick={handleOpenModal1}>로그인 모달</Button>
{modalOpen1 && (
  <SmallModal onClose={handleCloseModal1} component={<Login />} />
)}
{/* 동물등록 */}
<Button onClick={handleOpenModal2}>동물 등록 모달</Button>
{modalOpen2 && (
  <Modal
    onClose={handleCloseModal2}
    title="동물 정보 등록"
    value="등록"
    component={
      <PetRegister
      // formData={formData}
      // setFormData={setFormData}
      />
    }
    // onHandleClick={handleFormSubmit2}
  />
)}
{/* 동물 정보 수정 */}
<Button onClick={handleOpenModal3}>동물 수정 모달</Button>
{modalOpen3 && (
  <Modal
    onClose={handleCloseModal3}
    title="동물 정보 수정"
    value="수정"
    component={
      <PetRegister
      // formData={formData}
      // setFormData={setFormData}
      />
    }
    // onHandleClick={handleFormSubmit3}
  />
)}
{/* 일반 회원가입 */}
<Button onClick={handleOpenModal4}>일반 회원가입 모달</Button>
{modalOpen4 && (
  <SmallModal
    onClose={handleCloseModal4}
    component={<BasicRegistration />}
  />
)}
{/* 카카오 회원가입 */}
<Button onClick={handleOpenModal5}>카카오 회원가입 모달</Button>
{modalOpen5 && (
  <SmallModal
    onClose={handleCloseModal5}
    component={<KakaoRegistration />}
  />
)}
{/* 이메일 찾기 모달 1 */}
<Button onClick={handleOpenModal6}>이메일 찾기 모달 1</Button>
{modalOpen6 && (
  <SmallModal
    onClose={handleCloseModal6}
    modalPaddingSize="sm"
    component={<ForgotEmail />}
  />
)}
{/* 비밀번호 찾기 모달  */}
<Button onClick={handleOpenModal7}>비밀번호 찾기 모달</Button>
{modalOpen7 && (
  <SmallModal
    onClose={handleCloseModal7}
    modalPaddingSize="sm"
    component={<ForgotPassword />}
  />
)}