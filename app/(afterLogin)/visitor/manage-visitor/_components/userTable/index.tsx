import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableColumnsType,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd';
import { useGetAllVisitors } from '@/store/server/features/visitor/queries';
import { useVisitorsStore } from '@/store/uistate/features/visitor';
import { useDeleteVisitor, useUpdateVisitor } from '@/store/server/features/visitor/mutation';
import { useGetAllCompanies } from '@/store/server/features/companies/queries';
import { DATE_FORMAT_IN_NUMBER } from '@/utils/constants';
import dayjs from 'dayjs';

// Function to handle edit action

const { Option } = Select;

const UserTable = () => {
  const {page,pageSize,setPageSize,setPage}=useVisitorsStore()
  const {data:allVisitorsData,isLoading:visitorLoading}=useGetAllVisitors(page,pageSize);
  const {mutate:deleteVisitor,isLoading:deleteVisitorLoading}=useDeleteVisitor();
  const {mutate:editVisitor,isLoading:editVisitorLoading}=useUpdateVisitor();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState<any>(null);
  const { data: companiesData, isLoading: loadingCompanies } = useGetAllCompanies(page,pageSize); // Fetch companies

  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      ellipsis: true,
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        if (status === 'Approved') {
          color = 'text-green-500'; // Green for approved
        } else if (status === 'Pending') {
          color = 'text-yellow-500'; // Yellow for pending
        } else if (status === 'Rejected') {
          color = 'text-red-500'; // Red for rejected
        }
        return <span className={color}>{status}</span>;
      },
    },
    {
      title: 'Entry Start Date',
      dataIndex: 'expected_start_date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Entry End Date',
      dataIndex: 'expected_end_date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className='flex space-x-2'>
          <Button className='bg-green-300 text-green-900' onClick={() => handleEdit(record)}>Edit</Button>
          <Button loading={deleteVisitorLoading} className='bg-red-300 text-red-900' onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleEdit = (visitor:any) => {
    setCurrentVisitor(visitor);
    form.setFieldsValue({
      ...visitor,
      expected_start_date: [dayjs(visitor.expected_start_date), dayjs(visitor.expected_end_date)], // Set the range picker values
    });
    setIsEditModalVisible(true); // Show the edit modal
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this visitor?',
      content: 'This action cannot be undone.',
      onOk: () => {
        deleteVisitor(id); // Call deleteVisitor with the ID
      },
      onCancel() {
        console.log('Delete action canceled');
      },
    });
  };

  const handleEditSubmit = (values:any) => {
    const [expected_start_date, expected_end_date] = values.expected_start_date; // Extract the dates from the range picker
    const newData = { 
      id: currentVisitor.id,
      values: {
        ...values,
        expected_start_date: dayjs(expected_start_date).format(DATE_FORMAT_IN_NUMBER),
        expected_end_date: dayjs(expected_end_date).format(DATE_FORMAT_IN_NUMBER)
      }
    };
    editVisitor(newData, {
      onSuccess: () => {
        setIsEditModalVisible(false); // Close the modal
      }
    }); // Call editVisitor with updated values
  };

  return (
    <div className="mt-2">
      <Table
        className="w-full"
        columns={columns}
        dataSource={allVisitorsData?.data || []}
        pagination={{
          current: allVisitorsData?.current_page,
          pageSize: allVisitorsData?.per_page,
          total: allVisitorsData?.total,
          onChange: (page, pageSize) => {
           setPage(page);
           setPageSize(pageSize)
          },
        }}
        scroll={{ x: 1000 }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Visitor"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
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
            label="Expected Start and End Date"
            rules={[{ required: true, message: 'Please select the expected start and end date!' }]}
          >
            <RangePicker style={{ width: '100%' }} />
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
