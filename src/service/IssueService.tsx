// interface
// getIssueList(): Promise<IIssue[]>
// getIssueDetail(): Promise<IIssue>
import { IIssue } from 'types';

export class IssueService {
  #httpClient;

  constructor(httpClient: any) {
    this.#httpClient = httpClient;
  }

  async getIssueList(): Promise<IIssue[]> {
    const response = await this.#httpClient.fetch('');
    // console.log('get issue list response: ', response);
    return response.json();
  }

  async getIssueDetail(issueNumber: string): Promise<IIssue> {
    const response = await this.#httpClient.fetch(issueNumber);

    return response.json();
  }
}
