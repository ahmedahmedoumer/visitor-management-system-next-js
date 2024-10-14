'use client';

import React, { useEffect, useState } from 'react';
import { Card, Form, Input, DatePicker, Select, Button } from 'antd';
import CustomDrawerLayout from '@/components/common/customDrawer';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import { useUsersStore } from '@/store/uistate/features/users';
import { useGetAllCompanies } from '@/store/server/features/companies/queries'; // Assuming you have a query to fetch companies
import { useCreateVisitor } from '@/store/server/features/visitor/mutation';
import dayjs from 'dayjs';
import {DATE_FORMAT_IN_NUMBER } from '@/utils/constants';

const { Option } = Select;

const UserSidebar = (props: any) => {
  const [form] = Form.useForm();
  const { open,page,pageSize,setOpen } = useUsersStore();
  const { data: companiesData, isLoading: loadingCompanies } = useGetAllCompanies(page,pageSize); // Fetch companies
  const { mutate: createVisitorData, isLoading: loadingCreateVisitor } = useCreateVisitor(); // Fetch companies

  const handleCreateUser = async (values: any) => {
    const formattedData={
      ...values,
      expected_end_date:dayjs(values?.expected_end_date).format(DATE_FORMAT_IN_NUMBER),
      expected_start_date:dayjs(values?.expected_start_date).format(DATE_FORMAT_IN_NUMBER),
    }
    createVisitorData(formattedData,{
      onSuccess:()=>{
        form.resetFields();
        setOpen(false)
      }
    })
  };

  return (
    open && (
      <CustomDrawerLayout
        open={open}
        onClose={props?.onClose}
        modalHeader={<div className="flex justify-center text-xl font-extrabold text-gray-800 p-4">Add New Visitor</div>}
        width="40%"
      >
        <Form
          form={form}
          name="visitorForm"
          autoComplete="off"
          layout="vertical"
          onFinish={handleCreateUser}
          onFinishFailed={() =>
            NotificationMessage.error({
              message: 'Something wrong or unfilled',
              description: 'Please check the unfilled fields',
            })
          }
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contact_number"
            label="Contact Number"
            rules={[{ required: true, message: 'Please input the contact number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="identification_type"
            label="Identification Type"
            rules={[{ required: true, message: 'Please input the identification type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="identification_number"
            label="Identification Number"
            rules={[{ required: true, message: 'Please input the identification number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="purpose"
            label="Purpose"
            rules={[{ required: true, message: 'Please input the purpose!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="expected_start_date"
            label="Expected Start Date"
            rules={[{ required: true, message: 'Please select the expected start date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="expected_end_date"
            label="Expected End Date"
            rules={[{ required: true, message: 'Please select the expected end date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="company_id"
            label="Company ID"
            rules={[{ required: true, message: 'Please select a company!' }]}
          >
            <Select loading={loadingCompanies} placeholder="Select a company">
              {companiesData?.map((company:any) => (
                <Option key={company?.id} value={company?.id}>
                  {company?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className='flex justify-center'>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </CustomDrawerLayout>
    )
  );
};

export default UserSidebar;
