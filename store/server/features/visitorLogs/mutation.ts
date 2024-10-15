import axios from 'axios';
import { VISITOR_MANAGMENT_URL } from '@/utils/constants';
import { useMutation, useQueryClient } from 'react-query';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import { crudRequest } from '@/utils/crudRequest';
import { Material } from './interface';


const checkOutVisitor = async (
  id:string,checkedOutProperty:string[]
  ) => {
    const headers = {
      tenantId: "tenantId",
      Authorization: `Bearer ${"token"}`,
    };
    return await crudRequest({
      url: `${VISITOR_MANAGMENT_URL}/checkout/${id}`,
      method: 'post',
      data: {
        visitor_id:id,
        property_ids:checkedOutProperty
      },
      headers,
    });
  };

  // const checkInVisitor = async (id:string,values: Material[]) => {
  //   const headers = {
  //     tenantId: "tenantId",
  //     Authorization: `Bearer ${"token"}`,
  //   };
  //   const url = `${VISITOR_MANAGMENT_URL}/visitors/${id}`;
  //   try {
  //     return await crudRequest({
  //       url,
  //       method: "patch",
  //       headers,
  //       data:values,
  //     });
  //   } catch (error) {
  //     console.error("Error while checking in visitor:", error);
  //     throw error; 
  //   }
  // };
  

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
  

// API function that performs the check-in operation
const checkInVisitor = async (id: string, values: Material[]) => {
  const headers = {
    tenantId: "tenantId",
    Authorization: `Bearer ${"token"}`,
  };
  
  // Adjust the URL according to your backend route
  
  return await crudRequest({
    url: `${VISITOR_MANAGMENT_URL}/checkin/${id}`,
    method: 'post',
    headers,
    data: { properties: values },
  });
};

// React Query hook for the check-in mutation
export const useCheckInVisitor = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, values }: { id: string; values: any }) => checkInVisitor(id, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('visitors');
        NotificationMessage.success({
          message: 'Successfully Updated',
          description: 'Visitors successfully updated.',
        });
      },
      onError: (error) => {
        console.error("Check-in error:", error);
        NotificationMessage.error({
          message: 'Error',
          description: 'There was an error updating the visitors.',
        });
      },
    }
  );
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




