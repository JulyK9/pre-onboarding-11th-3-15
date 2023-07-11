import Item from 'components/common/Item';
import { useEffect, useState } from 'react';
import { IIssue } from 'types';

const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const List = () => {
  const [issues, setIssues] = useState<IIssue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/repos/facebook/react/issues', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${githubToken}`,
        },
      });

      const issueList = await response.json();

      setIssues((prev) => [...prev, ...issueList]);
    };

    fetchData();
  }, []);

  return <ul>{issues?.map((issue: IIssue) => <Item key={issue?.id} issue={issue} />)}</ul>;
};

export default List;
