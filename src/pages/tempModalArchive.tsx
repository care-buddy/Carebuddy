import React, { useState } from 'react';

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