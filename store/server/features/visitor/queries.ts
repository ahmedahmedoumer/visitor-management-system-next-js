import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import {VISITOR_MANAGMENT_URL } from '@/utils/constants';
import axios from 'axios';
import { useQuery } from 'react-query';


// Function to retrieve all visitors
const getAllVisitors = async (page:number,pageSize:number) => {
  const token = useAuthenticationStore.getState().token; // Access the latest token
  const localId = useAuthenticationStore.getState().localId;
  const response = await axios.get(`${VISITOR_MANAGMENT_URL}/visitors?page=${page}&limit=${pageSize}`);
  return response.data;
};

// Function to retrieve all visitors
const getAllUnApprovedVisitors = async (page:number,pageSize:number) => {
  const token = useAuthenticationStore.getState().token; // Access the latest token
  const localId = useAuthenticationStore.getState().localId;
  const response = await axios.get(`${VISITOR_MANAGMENT_URL}/visitors?status=notApproved&page=${page}&limit=${pageSize}`);
  return response.data;
};

// Function to retrieve a specific visitor by ID
const getVisitorById = async (id: string|null) => {
  const token = useAuthenticationStore.getState().token; // Access the latest token
  const localId = useAuthenticationStore.getState().localId;
  const response = await axios.get(`${VISITOR_MANAGMENT_URL}/visitors/${id}`);
  return response.data;
};



export const useGetAllVisitors = (page:number,pageSize:number) =>
  useQuery<any>(['visitors',page,pageSize], ()=>getAllVisitors(page,pageSize), {
    keepPreviousData: true,
  });

export const useGetUnApprovedVisitors = (page:number,pageSize:number) =>
  useQuery<any>(['visitors',page,pageSize], ()=>getAllUnApprovedVisitors(page,pageSize), {
    keepPreviousData: true,
  });
  

export const useGetVisitorById = (id: string|null) =>
  useQuery<any>(['visitor', id], () => getVisitorById(id), {
    keepPreviousData: true,
    enabled:!!id,
  });
