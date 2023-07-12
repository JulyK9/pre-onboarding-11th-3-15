// interface
// getIssueList(): Promise<IIssue[]>
// getIssueDetail(): Promise<IIssue>
import { IIssue } from 'types';

export class IssueService {
  #httpClient;

  constructor(httpClient: any) {
    this.#httpClient = httpClient;
  }

  async fetchIssueList(pageNum: number): Promise<IIssue[]> {
    const response = await this.#httpClient.fetch(`?state=open&sort=comments&page=${pageNum}`);
    return response.json();
  }

  async fetchIssueDetail(issueNumber: string): Promise<IIssue> {
    const response = await this.#httpClient.fetch('/' + issueNumber);

    return response.json();
  }
}
