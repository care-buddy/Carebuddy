import { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface FormData {
  title: string;
  content: string;
  categoryId: string;
  postImage: string[];
}

const usePostCreate = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    categoryId: '',
    postImage: [],
  });

  const handleFormDataChange = (data: {
    title?: string;
    content?: string;
    categoryId?: string;
    postImage?: string[];
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handlePostSubmit = async () => {
    try {
      const response = await axiosInstance.post('posts', formData); // 
      console.log('게시물 생성됨:', response.data);
      alert('게시글 작성 완료');
      onSuccess(); // 임시 - 추가 실행할 로직(변수로 받을 것)
    } catch (error) {
      console.error('게시물 생성 오류', error);
    }
  };

  return { formData, handleFormDataChange, handlePostSubmit };
};

export default usePostCreate;
