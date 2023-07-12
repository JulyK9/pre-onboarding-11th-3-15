import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IIssue } from 'types';

const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const Detail = () => {
  const [issueDetail, setIssueDetail] = useState<IIssue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();
  const { issueNumber } = params;

  useEffect(() => {
    setIsLoading(true);
    const getDetailIssue = async () => {
      const response = await fetch(`https://api.github.com/repos/facebook/react/issues/${issueNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${githubToken}`,
        },
      });

      const detailIssue = await response.json();

      setIssueDetail(detailIssue);
      setIsLoading(false);
    };

    getDetailIssue();
  }, [issueNumber]);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div>
            <div>프로필</div>
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
