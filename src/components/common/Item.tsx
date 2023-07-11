import { useNavigate } from 'react-router-dom';
import { IIssue } from 'types';

interface ItemProps {
  issue: IIssue;
}

const Item = ({ issue }: ItemProps) => {
  const navigate = useNavigate();

  const clickToDetailIssue = (issueNumber: number) => {
    navigate(`/issues/${issueNumber}`);
  };

  return (
    <li onClick={() => clickToDetailIssue(issue?.number)}>
      <div>
        <div>
          <span>#{issue?.number}</span>
          <span>{issue?.title}</span>
        </div>
        <div>
          <span>작성자: {issue?.user?.login}</span>
          <span>작성일: {issue?.created_at}</span>
        </div>
      </div>
      <div>코멘트: {issue?.comments}</div>
    </li>
  );
};

export default Item;
