import { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const usePostCreate = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  // 폼데이터 내용물 확인용 함수입니다
  // const formDataToJson = (formData: FormData) => {
  //   const obj: { [key: string]: any } = {};

  //   for (const [key, value] of formData.entries()) {
  //     // FormData.entries()에서 value가 Blob일 경우, 직접 변환하기 어려우므로
  //     // 텍스트로 변환할 수 있는 경우를 제외하고는 문자열로 저장합니다.
  //     if (value instanceof Blob) {
  //       obj[key] = value instanceof File ? value.name : value.toString();
  //     } else {
  //       obj[key] = value;
  //     }
  //   }

  //   return obj;
  // };

  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  const handlePostSubmit = async () => {
    try {
      const response = await axiosInstance.post('posts', formData); 
      alert('게시글 작성 완료');
      navigate(`post/${response.data.data}`)
      onSuccess(); // 임시 - 추가 실행할 로직(변수로 받을 것)
    } catch (error) {
      console.error('게시물 생성 오류', error);
    }
  };

  const handleEditPostSubmit = async (id: string | undefined) => {
    try {
      await axiosInstance.put(`posts/${id}`, formData); 

      alert('게시글 수정 완료');
      onSuccess(); // 임시 - 추가 실행할 로직(변수로 받을 것)
    } catch (error) {
      console.error('게시물 생성 오류', error);
    }
  };

  return {
    formData,
    handleFormDataChange,
    handlePostSubmit,
    handleEditPostSubmit,
  };
};

export default usePostCreate;
