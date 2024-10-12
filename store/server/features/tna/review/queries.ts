import { RequestCommonQueryData } from '@/types/commons/requesTypes';
import { TnaRequestBody } from '@/store/server/features/tna/review/interface';
import { crudRequest } from '@/utils/crudRequest';
import { TNA_URL } from '@/utils/constants';
import { requestHeader } from '@/helpers/requestHeader';
import { useQuery } from 'react-query';
import { ApiResponse } from '@/types/commons/responseTypes';
import { TrainingNeedAssessment } from '@/types/tna/tna';

const getTna = async (
  query: Partial<RequestCommonQueryData>,
  data: Partial<TnaRequestBody>,
) => {
  return await crudRequest({
    url: `${TNA_URL}/tna`,
    method: 'POST',
    headers: requestHeader(),
    data,
    params: query,
  });
};

export const useGetTna = (
  query: Partial<RequestCommonQueryData>,
  data: Partial<TnaRequestBody>,
  isKeepData: boolean = true,
  isEnabled: boolean = true,
) => {
  return useQuery<ApiResponse<TrainingNeedAssessment>>(
    ['tna', query, data],
    () => getTna(query, data),
    {
      keepPreviousData: isKeepData,
      enabled: isEnabled,
    },
  );
};
