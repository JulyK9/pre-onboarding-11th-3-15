import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IIssue } from 'types';

const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const Detail = () => {
  const [issueDetail, setIssueDetail] = useState<IIssue>();

  const params = useParams();
  const { issueNumber } = params;

  useEffect(() => {
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
    };

    getDetailIssue();
  }, []);
  console.log(issueDetail);
  return <div>Detail</div>;
};

export default Detail;
