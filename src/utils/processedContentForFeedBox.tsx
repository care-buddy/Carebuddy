// FeedBox용 두 문장만 보여주기 함수
const processedContentForFeedBox = (content: string) =>
  content.split('. ').slice(0, 2).join('. '); // 두 문장만 보여주기

export default processedContentForFeedBox;
