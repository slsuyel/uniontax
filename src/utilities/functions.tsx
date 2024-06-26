/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { baseUrl } from '../baseurl/BaseUrl.ts';

export const callApi = async (
  method: string,
  url: string,
  dataObj: any = null,
  headers: any = {},
  bUrl: boolean = true
) => {
  const apiUrl = bUrl ? `${baseUrl}${url}` : `${url}`;
  try {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios({
      method: method,
      url: apiUrl,
      data: dataObj,
      headers: headers,
    });

    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      // console.error('Error making API call:', error);
      return null;
    }
  }
};
