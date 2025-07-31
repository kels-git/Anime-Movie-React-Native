import axios from 'axios';
import Config from '../config';

export type PathFunction = (...args: any[]) => string;

export interface ApiEndpoint {
  path: string | PathFunction;
}

const printInfo = (
  method: string,
  path: string,
  parameters: any,
  response: any,
) => {
  const infoList = [
    `Method: ${method}`,
    `Path: ${path}`,
    `Parameters: ${JSON.stringify(parameters, null, 2)}`,
  ];
  console.log(`\n================================\n${infoList.join('\n')}`);
  console.log('Response:', response);
  console.log('\n================================\n');
};

export interface APIGatewayInitRequest {
  headers?: Record<string, string>;
  queryStringParameters?: Record<string, string | number | undefined>;
  body?: any;
  responseType?: 'blob' | 'json' | 'text';
}

export class ApiGatewayService {
  private static baseUrl = Config.baseUrl;

  private static resolvePath(endpoint: ApiEndpoint, ...args: any[]): string {
    return typeof endpoint.path === 'function'
      ? endpoint.path(...args)
      : endpoint.path;
  }

  static async get(
    api: ApiEndpoint,
    init: APIGatewayInitRequest = {},
    ...pathParams: any[]
  ) {
    try {
      const resolvedPath = this.resolvePath(api, ...pathParams);
      const response = await axios.get(`${this.baseUrl}${resolvedPath}`, {
        params: init.queryStringParameters,
        headers: init.headers,
        responseType: init.responseType,
      });
      printInfo('GET', resolvedPath, init, response.data);
      return response;
    } catch (error) {
      console.error('GET Request Error:', error);
      throw error;
    }
  }
}
