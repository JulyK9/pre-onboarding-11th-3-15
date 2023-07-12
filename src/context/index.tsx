import { HttpClient } from 'api/httpClient';
import React, { createContext, useContext, useEffect, useState } from 'react';
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

  const getIssueDetail = async (issueNumber: string) => {
    await issueService.fetchIssueDetail(issueNumber).then((issue) => {
      setIssueDetail(issue);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    issueService.fetchIssueList().then((issues: IIssue[]) => {
      setIssueList((prev) => [...prev, ...issues]);
      setIsLoading(false);
    });
  }, []);
  const value = { issueList, isLoading, issueDetail, getIssueDetail, setIsLoading };

  return <GetIssueContext.Provider value={value}>{children}</GetIssueContext.Provider>;
}
