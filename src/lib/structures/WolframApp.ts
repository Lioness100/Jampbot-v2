import { createHash } from 'crypto';
import fetch from 'node-fetch';

interface Query {
  queryresult: Result;
}

interface Result {
  success: boolean;
  error: boolean;
  pods?: {
    title: string;
    subpods: { plaintext: string; img: { src: string } }[];
  }[];
  didyoumeans?: {
    val: string;
  };
}

export default class WolframApp {
  public constructor(private id: string) {}

  public async calculate(query: string): Promise<Result> {
    const uri = this.parseURL(
      `input=${this.encodeData(
        query
      )}&podstate=Step-by-step%20solution&output=json&format=plaintext,image`
    );
    return ((await (await fetch(uri)).json()) as Query).queryresult;
  }

  private getSignature(query: string): string {
    const sig = query
      .split('&')
      .map((param) => param.split('='))
      .sort(([key]) => +key)
      .reduce((acc, [key, value]) => (acc += key + value), 'vFdeaRwBTVqdc5CL');

    return createHash('md5').update(sig).digest('hex').toUpperCase();
  }

  private parseURL(query: string): string {
    const params = new Map([['appid', this.id]]);

    query
      .split('&')
      .map((param) => param.split('='))
      .map((param) => param.map((data) => this.decodeData(data)))
      .filter((param) => param.length > 1)
      .map((x) => params.set(x[0], x[1]));

    query = [...params.entries()]
      .map(
        ([key, value]) => `${this.encodeData(key)}=${this.encodeData(value)}`
      )
      .sort()
      .join('&');

    query += `&sig=${this.getSignature(query)}`;

    return `https://api.wolframalpha.com/v2/query.jsp?${query}`;
  }

  private decodeData(query: string): string {
    return decodeURIComponent(
      query
        .replace(/%2D/g, '-')
        .replace(/%5F/g, '_')
        .replace(/%2E/g, '.')
        .replace(/%21/g, '!')
        .replace(/%7E/g, '~')
        .replace(/%2A/g, '*')
        .replace(/%27/g, "'")
        .replace(/%28/g, '(')
        .replace(/%29/g, ')')
    );
  }

  private encodeData(query: string): string {
    return encodeURIComponent(query)
      .replace(/-/g, '%2D')
      .replace(/_/g, '%5F')
      .replace(/\./g, '%2E')
      .replace(/!/g, '%21')
      .replace(/~/g, '%7E')
      .replace(/\*/g, '%2A')
      .replace(/\'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29');
  }
}
