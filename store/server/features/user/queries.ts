import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { useUsersStore } from '@/store/uistate/features/users';
import {VISITOR_MANAGMENT_URL } from '@/utils/constants';
import axios from 'axios';
import { useQuery } from 'react-query';

/**
 * Function to fetch a tenant id by sending a GET request to the API
 * @param id The ID of the localId which fetch from firebase to fetch
 * @returns The response data from the API
 */
const getAllUsers = async (page:number,pageSize:number) => {
  const token = useAuthenticationStore.getState().token; // Access the latest token
  const localId = useAuthenticationStore.getState().localId;

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${VISITOR_MANAGMENT_URL}/users?page=${page}&limit=${pageSize}`,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id:string) => {
    const token = useAuthenticationStore.getState().token; // Access the latest token
    const localId = useAuthenticationStore.getState().localId;
   
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${VISITOR_MANAGMENT_URL}/users/${id}`,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const useGetAllUsers = (page:number,pageSize:number) =>
  useQuery<any>('users', () => getAllUsers(page,pageSize), {
    keepPreviousData: true,
  });


  export const useGetUserById = (id:string) =>
    useQuery<any>('user', () => getUserById(id), {
      keepPreviousData: true,
    });
