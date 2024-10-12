import { useMutation, useQueryClient } from 'react-query';
import { crudRequest } from '@/utils/crudRequest';
import { OKR_URL } from '@/utils/constants';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { PlanningPeriod } from './interface';
import NotificationMessage from '@/components/common/notification/notificationMessage';

const token = useAuthenticationStore.getState().token;
const tenantId = useAuthenticationStore.getState().tenantId;

const updatePlanningPeriod = async (id: string, data: PlanningPeriod) => {
  return crudRequest({
    url: `${OKR_URL}/planning-periods/${id}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
    data,
  });
};

const updatePlanningPeriodStatus = async (planningPeriodId: string) => {
  return crudRequest({
    url: `${OKR_URL}/planning-periods/update/planning-period/status/${planningPeriodId}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
  });
};
const deletePlanningPeriod = async (id: string) => {
  return crudRequest({
    url: `${OKR_URL}/planning-periods/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
  });
};
const assignPlanningPeriodToUsers = async (planningPeriodId: string) => {
  const userId = useAuthenticationStore.getState().userId;
  return crudRequest({
    url: `${OKR_URL}/planning-periods/assignUser`,
    method: 'post',
    data: { planningPeriodId, userId },
    headers: {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
  });
};

// Exporting hooks for mutations
export const useUpdatePlanningPeriod = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { id: string; data: any }) =>
      updatePlanningPeriod(params.id, params.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('planningPeriods'); // Adjust the query key as necessary
        NotificationMessage.success({
          message: 'Successfully Updated',
          description: 'Planning period successfully updated.',
        });
      },
    },
  );
};
export const useUpdatePlanningPeriodStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (planningPeriodId: string) => updatePlanningPeriodStatus(planningPeriodId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('planningPeriods'); // Adjust the query key as necessary
        NotificationMessage.success({
          message: 'Successfully Updated',
          description: 'Planning period successfully updated.',
        });
      },
    },
  );
};

export const useDeletePlanningPeriod = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deletePlanningPeriod(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('planningPeriods'); // Adjust the query key as necessary
      NotificationMessage.success({
        message: 'Successfully Deleted',
        description: 'Planning period successfully deleted.',
      });
    },
  });
};
export const useAssignPlanningPeriodToUsers = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (planningPeriodId: string) => assignPlanningPeriodToUsers(planningPeriodId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('planningPeriodUser'); // Adjust the query key as necessary
        NotificationMessage.success({
          message: 'Successfully Assigned',
          description: 'Planning period successfully assigned to users.',
        });
      },
    },
  );
};
