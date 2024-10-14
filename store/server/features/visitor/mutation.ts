import axios from 'axios';
import { VISITOR_MANAGMENT_URL } from '@/utils/constants';
import { useMutation, useQueryClient } from 'react-query';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import { crudRequest } from '@/utils/crudRequest';


const createVisitor = async (
    values: any,
  ) => {
    const headers = {
      tenantId: "tenantId",
      Authorization: `Bearer ${"token"}`,
    };
    // /okr-report-task/create-report/:userId/:planningPeriodId
    return await crudRequest({
      url: `${VISITOR_MANAGMENT_URL}/visitors`,
      method: 'post',
      data: values,
      headers,
    });
  };

const deleteVisitor = async (
  id: string,
) => {
  const headers = {
    tenantId: "tenantId",
    Authorization: `Bearer ${"token"}`,
  };
  // /okr-report-task/create-report/:userId/:planningPeriodId
  return await crudRequest({
    url: `${VISITOR_MANAGMENT_URL}/visitors/${id}`,
    method: 'delete',
    headers,
  });
};

const updateVisitor = async (
  id:string,
  values: any,
) => {
  console.log(id,values,"*****************************")
    const headers = {
      tenantId: "tenantId",
      Authorization: `Bearer ${"token"}`,
    };
    return await crudRequest({
      url: `${VISITOR_MANAGMENT_URL}/visitors/${id}`,
      method: 'patch',
      data: values,
      headers,
    });
  };
  

// Function to delete a visitor
export const useCreateVisitor = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (values:any) =>
            createVisitor(values),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('visitors');
          NotificationMessage.success({
            message: 'Successfully created',
            description: 'visitors successfully Created',
          });
        },
      },
    );
};
export const useUpdateVisitor = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id, values }: { id: string; values: any }) =>updateVisitor(id,values),
      {
        onSuccess:()=>{
         queryClient.invalidateQueries('visitors');
         
         NotificationMessage.success({
          message: 'Successfully Updated',
          description: 'visitors successfully Updated',
        });
        }
      });
};
export const useDeleteVisitor = () => {
const queryClient = useQueryClient();

return useMutation((id:string) =>deleteVisitor(id),{
  onSuccess:()=>{
    queryClient.invalidateQueries('visitors');
    NotificationMessage.success({
      message: 'Successfully deleted',
      description: 'visitors successfully deleted',
    });
  }
});
};




