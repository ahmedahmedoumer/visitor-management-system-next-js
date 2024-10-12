import { OKR_AND_PLANNING_URL } from '@/utils/constants';
import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import axios from 'axios';
import { AppreciationLog } from '@/store/uistate/features/okrplanning/monitoring-evaluation/appreciation-log/interface';

const token = useAuthenticationStore.getState().token;
const tenantId = useAuthenticationStore.getState().tenantId;

type ResponseData = {
  items: AppreciationLog[];
  meta?: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
type ResponseDataAll = AppreciationLog[];
type ResponseDataDetail = AppreciationLog;

/**
 * Function to fetch posts by sending a GET request to the API
 * @returns The response data from the API
 */
const getAppreciationLog = async (userId: string, typeId: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      tenantId: tenantId, // Pass tenantId in the headers
    };
    const response = await axios.get(
      `${OKR_AND_PLANNING_URL}/appreciation-log?userId=${userId}&typeId=${typeId}`,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getAppRepAll = async (userId: string, typeId: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      tenantId: tenantId, // Pass tenantId in the headers
    };
    const response = await axios.get(
      `${OKR_AND_PLANNING_URL}/appreciation-log/all?userId=${userId}&typeId=${typeId}`,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to fetch a single post by sending a GET request to the API
 * @param id The ID of the post to fetch
 * @returns The response data from the API
 */
const getAppreciationLogById = async (id: number | string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      tenantId: tenantId, // Pass tenantId in the headers
    };
    const response = await axios.get(
      `${OKR_AND_PLANNING_URL}/appreciation-log/${id}`,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 * Custom hook to fetch a list of posts using useQuery from react-query.
 *
 * @returns The query object for fetching posts.
 *
 * @description
 * This hook uses `useQuery` to fetch a list of posts from the API. It returns
 * the query object containing the posts data and any loading or error states.
 */

/**
 * Custom hook to fetch a single post by ID using useQuery from react-query.
 *
 * @param postId The ID of the post to fetch
 * @returns The query object for fetching the post.
 *
 * @description
 * This hook uses `useQuery` to fetch a single post by its ID. It returns the
 * query object containing the post data, and it keeps the previous data
 * while the new data is being fetched.
 */

export const useGetAppreciationLog = (userId: string, typeId: string) =>
  useQuery<ResponseData>(
    ['appreciationLog', userId, typeId],
    () => getAppreciationLog(userId, typeId),
    {
      keepPreviousData: true,
    },
  );
export const useGetAppRepAll = (userId: string, typeId: string) =>
  useQuery<ResponseDataAll>(
    ['appreciationLog', 'reprimandLog', userId, typeId],
    () => getAppRepAll(userId, typeId),
    {
      keepPreviousData: true,
    },
  );

export const useGetAppreciationLogById = (id: string) =>
  useQuery<ResponseDataDetail>(
    ['appreciationLogById', id],
    () => getAppreciationLogById(id),
    {
      keepPreviousData: true,
    },
  );
