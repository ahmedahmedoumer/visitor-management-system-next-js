import { TrainingNeedCategory } from '@/types/tna/tna';
import { crudRequest } from '@/utils/crudRequest';
import { TNA_URL } from '@/utils/constants';
import { requestHeader } from '@/helpers/requestHeader';
import { useMutation, useQueryClient } from 'react-query';
import { handleSuccessMessage } from '@/utils/showSuccessMessage';

const setTnaCategory = async (items: Partial<TrainingNeedCategory>[]) => {
  return await crudRequest({
    url: `${TNA_URL}/tna/category`,
    method: 'PUT',
    headers: requestHeader(),
    data: { items },
  });
};

const deleteTnaCategory = async (id: string[]) => {
  return await crudRequest({
    url: `${TNA_URL}/tna/category`,
    method: 'DELETE',
    headers: requestHeader(),
    data: { id },
  });
};

export const useSetTnaCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(setTnaCategory, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries('tna-category');
      const method = variables?.method?.toUpperCase();
      handleSuccessMessage(method);
    },
  });
};

export const useDeleteTnaCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTnaCategory, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries('tna-category');
      const method = variables?.method?.toUpperCase();
      handleSuccessMessage(method);
    },
  });
};
