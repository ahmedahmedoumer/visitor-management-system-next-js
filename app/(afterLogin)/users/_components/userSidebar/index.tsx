'use client';

import React from 'react';
import { Card, Form, Steps } from 'antd';
import CustomDrawerLayout from '@/components/common/customDrawer';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import { useUsersStore } from '@/store/uistate/features/users';


const UserSidebar = (props: any) => {
  const [form] = Form.useForm();
  const { setCurrent, current, open } = useUsersStore();

  const modalHeader = (
    <div className="flex justify-center text-xl font-extrabold text-gray-800 p-4">
      Add New Employee
    </div>
  );

  const handleCreateUser = (values: any) => {
  };

  return (
    open && (
      <CustomDrawerLayout
        open={open}
        onClose={props?.onClose}
        modalHeader={modalHeader}
        width="40%"
      >

        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{ maxWidth: '100%' }}
          layout="vertical"
          onFinish={handleCreateUser}
          onFinishFailed={() =>
            NotificationMessage.error({
              message: 'Something wrong or unfilled',
              description: 'please back and check the unfilled fields',
            })
          }
        >
          <Card className="p-4 sm:p-6">
           
          </Card>
          <Card  className="p-4 sm:p-6">

          </Card>
          <Card className="p-4 sm:p-6">
            
          </Card>
        </Form>
      </CustomDrawerLayout>
    )
  );
};

export default UserSidebar;
