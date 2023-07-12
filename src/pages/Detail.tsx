import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetIssue } from 'context';

const Detail = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { issueDetail, getIssueDetail, isLoading, setIsLoading }: any = useGetIssue();

  const params = useParams();
  const { issueNumber } = params;

  useEffect(() => {
    setIsLoading(true);
    getIssueDetail(issueNumber);
  }, []);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div>
            <div>
              <img src={issueDetail?.user.avatar_url} alt="avatar-Url" />
            </div>
            <div>
              <div>
                <span>#{issueDetail?.number}</span>
                <span>{issueDetail?.title}</span>
              </div>
              <div>
                <span>작성자: {issueDetail?.user.login}</span>
                <span>작성일: {issueDetail?.created_at}</span>
              </div>
            </div>
            <div>코멘트: {issueDetail?.comments}</div>
          </div>
          <div>{issueDetail?.body}</div>
        </>
      )}
    </>
  );
};

export default Detail;
