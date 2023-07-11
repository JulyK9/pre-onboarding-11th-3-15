import { IIssue } from 'types';

interface ItemProps {
  // issue?: IIssueItem;
  issue?: IIssue;
}

const Item = ({ issue }: ItemProps) => {
  return (
    <li>
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
