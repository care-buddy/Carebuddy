import { useState } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

interface FormData {
  title: string;
  content: string;
  groupId: string; // 임시 - 나중에 categoryId로 수정
  postImage: string[];
}

const usePostCreate = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    groupId: '', // 임시 - 나중에 categoryId로 수정
    postImage: [],
  });

  const handleFormDataChange = (data: {
    title?: string;
    content?: string;
    groupId?: string;
    postImage?: string[];
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handlePostSubmit = async () => {
    try {
      const mock = new MockAdapter(axios, { delayResponse: 500 });

      mock.onPost('/api/posts').reply((config) => {
        const { title, content, groupId, postImage } = JSON.parse(config.data);
        // console.log('게시물 생성:', { title, content, groupId, postImage });
        return [200, { title, content, groupId, postImage }];
      });
      
      const response = await axiosInstance.post('/api/posts', formData);
      console.log('게시물 생성됨:', response.data);
      alert('게시글 작성 완료');
      onSuccess(); // 추가 실행할 로직
    } catch (error) {
      console.error('게시물 생성 오류', error);
    }
  };

  return { formData, handleFormDataChange, handlePostSubmit };
};

export default usePostCreate;
