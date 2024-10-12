import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { ORG_AND_EMP_URL } from '@/utils/constants';
import axios from 'axios';
import { useQuery } from 'react-query';

const getEmployee = async (id: string) => {
  const token = useAuthenticationStore.getState().token;
  const tenantId = useAuthenticationStore.getState().tenantId;

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    };
    const response = await axios.get(`${ORG_AND_EMP_URL}/users/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const useGetEmployee = (empId: string) =>
  useQuery<any>(['employee', empId], () => getEmployee(empId), {
    keepPreviousData: true,
  });
