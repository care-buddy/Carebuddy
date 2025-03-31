// 환경에 따른 API URL 및 홈페이지 URL 설정
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction
  ? 'https://back-theta-peach.vercel.app/api/'
  : // ? 'https://port-0-back-m2swdvfbbfb61876.sel4.cloudtype.app/api/' // 배포 환경용 API URL
    'http://localhost:3001/api/'; // 로컬 개발 환경용 API URL

export const HOMEPAGE = isProduction
  ? 'https://carebuddy.vercel.app' // 배포 환경용 홈페이지 URL
  : 'http://localhost:5173'; // 로컬 개발 환경용 홈페이지 URL
