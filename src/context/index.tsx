import { HttpClient } from 'api/httpClient';
import React, { createContext, useContext, useState, useMemo } from 'react';
import { IssueService } from 'service/IssueService';
import { IIssue } from 'types';

interface GetIssueContextValue {
  issueList: IIssue[];
}

const GetIssueContext = createContext<GetIssueContextValue | null>(null);

export const useGetIssue = () => useContext(GetIssueContext);

const BASE_URL = 'https://api.github.com/repos/facebook/react/issues';
const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const httpClient = new HttpClient(BASE_URL, githubToken);
const issueService = new IssueService(httpClient);

export function GetIssueProvider({ children }: { children: React.ReactNode }) {
  const [issueList, setIssueList] = useState<IIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [issueDetail, setIssueDetail] = useState<IIssue>();

  const [pageNum, setPageNum] = useState(0);
  const [isMoreList, setIsMoreList] = useState(false);

  const organization = useMemo(() => issueList[0]?.url.split('/')[4], [issueList]);
  const repository = useMemo(() => issueList[0]?.url.split('/')[5], [issueList]);

  const getIssueDetail = async (issueNumber: string) => {
    await issueService.fetchIssueDetail(issueNumber).then((issue) => {
      setIssueDetail(issue);
      setIsLoading(false);
    });
  };

  const getNextList = () => {
    if (!isMoreList) {
      getListByPageNum(pageNum + 1);
      setPageNum(pageNum + 1);
    }
  };

  const getListByPageNum = async (pageNum: number) => {
    setIsLoading(true);

    await issueService.fetchIssueList(pageNum).then((issues: IIssue[]) => {
      if (issues.length === 0) {
        setIsMoreList(true);
      }
      setIssueList((prev) => [...prev, ...issues]);
      setIsLoading(false);
    });
  };

  const value = {
    issueList,
    isLoading,
    issueDetail,
    getIssueDetail,
    setIsLoading,
    organization,
    repository,
    isMoreList,
    getNextList,
  };

  return <GetIssueContext.Provider value={value}>{children}</GetIssueContext.Provider>;
}
