// HttpClient Interface
// fetch(endpoint, options): Promise<null>

// eslint-disable-next-line no-undef
interface HttpClientOptions extends RequestInit {
  headers?: {
    [key: string]: string;
  };
}

export class HttpClient {
  #baseURL;
  #token;

  constructor(baseURL: string, token: string | undefined) {
    this.#baseURL = baseURL;
    this.#token = token;
  }

  fetch(endpoint: string, options: HttpClientOptions = {}): Promise<Response> {
    const optionsWithToken = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${this.#token}`,
      },
    };
    return window.fetch(this.#baseURL + endpoint, optionsWithToken);
  }
}
