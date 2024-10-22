// import { useEffect } from "react";
// import axiosInstance from "@/utils/axiosInstance";

// import { CommunityData } from "@/interfaces";

// import pickRandomItemFromArray from "@/utils/pickRandomItemFromArray";

// // 추천 그룹 사이드바용 API(전체 그룹 조회)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: CommunityData[] }>(
//           'communities'
//         );
//         const communityArray = pickRandomItemFromArray(response.data.data, 3);
//         setRecommendedCommunities(communityArray);
//       } catch (error) {
//         // 에러 처리 로직
//       }
//     };

//     fetchData();
//   }, []);