import Item from 'components/common/Item';
import { useGetIssue } from 'context';
import React, { useEffect, useRef, useCallback } from 'react';
import { IIssue } from 'types';

const List = () => {
  const { issueList, isLoading, getNextList, isMoreList }: any = useGetIssue();

  const bannerElement = (
    <li>
      <a href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
          alt="Ad Banner"
        />
      </a>
    </li>
  );

  const copyIssueList = issueList.reduce((acc: any[], issue: IIssue, idx: number) => {
    acc.push(<Item key={issue.id} issue={issue} />);
    if ((idx + 1) % 4 === 0) {
      acc.push(<React.Fragment key={`banner_${idx}`}>{bannerElement}</React.Fragment>);
    }
    return acc;
  }, []);

  const observerLoader = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const scrollPosition = useRef<number>(0);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        observer.unobserve(observerLoader.current as HTMLDivElement);
        if (isMoreList) {
          window.scrollTo(0, scrollPosition.current);
          observer.disconnect();
          return;
        }

        scrollPosition.current = window.scrollY;

        getNextList();
      }
    },
    [isLoading, isMoreList, getNextList],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (observerLoader.current) {
      observer.current.observe(observerLoader.current);
    }
    return () => {
      if (observer.current) {
        observer && observer.current.disconnect();
      }
    };
  }, [handleObserver]);

  console.log('copyIssueList: ', copyIssueList);
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {copyIssueList?.map((issue: React.ReactNode, index: number) => (
            <React.Fragment key={index}>{issue}</React.Fragment>
          ))}
          <div ref={observerLoader}>{isLoading && <span>추가 리스트 가져오는중...</span>}</div>
        </ul>
      )}
    </>
  );
};

export default List;
