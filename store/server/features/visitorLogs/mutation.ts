import axios from 'axios';
import { VISITOR_MANAGMENT_URL } from '@/utils/constants';
import { useMutation, useQueryClient } from 'react-query';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import { crudRequest } from '@/utils/crudRequest';


const checkOutVisitor = async (
  id:string,checkedOutProperty:string[]
  ) => {
    const headers = {
      tenantId: "tenantId",
      Authorization: `Bearer ${"token"}`,
    };
    // /okr-report-task/create-report/:userId/:planningPeriodId
    return await crudRequest({
      url: `${VISITOR_MANAGMENT_URL}/checkout/${id}`,
      method: 'post',
      data: {
        id:id,
        property_ids:checkedOutProperty
      },
      headers,
    });
  };

const checkInVisitor = async (
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
  

export const useCheckInVisitor = () => {
  const queryClient = useQueryClient();
  return useMutation(
      ({ id, values }: { id: string; values: any }) =>checkInVisitor(id),
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
export const useCheckOutVisitor = () => {
const queryClient = useQueryClient();

return useMutation(({id,checkedOutProperty}:{id:string,checkedOutProperty:string[]}) =>checkOutVisitor(id,checkedOutProperty),{
  onSuccess:()=>{
    queryClient.invalidateQueries('visitors');
    NotificationMessage.success({
      message: 'Successfully deleted',
      description: 'visitors successfully deleted',
    });
  }
});
};




