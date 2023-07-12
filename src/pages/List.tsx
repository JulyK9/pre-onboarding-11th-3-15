import Item from 'components/common/Item';
import { useGetIssue } from 'context';
import { IIssue } from 'types';

const List = () => {
  const { issueList, isLoading }: any = useGetIssue();
  console.log('issueList: ', issueList);
  // console.log('isLoading: ', isLoading);
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>{issueList?.map((issue: IIssue) => <Item key={issue?.id} issue={issue} />)}</ul>
      )}
    </>
  );
};

export default List;
