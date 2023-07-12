import { useGetIssue } from 'context';

const Header = () => {
  const { organization, repository }: any = useGetIssue();

  return (
    <>
      <h2>
        {organization} / {repository}
      </h2>
    </>
  );
};

export default Header;
