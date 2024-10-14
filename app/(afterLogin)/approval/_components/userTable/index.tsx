import React, { useState } from 'react';
import {
  Button,
  Table,
  TableColumnsType,
  Modal,
  Form,
  Input,
  DatePicker,
  Avatar,
} from 'antd';
import { useUsersStore } from '@/store/uistate/features/users';
import { useGetUnApprovedVisitors } from '@/store/server/features/visitor/queries';
import { FaEye } from 'react-icons/fa';
import dayjs from 'dayjs';
import { DATE_FORMAT_IN_NUMBER } from '@/utils/constants';
import { useUpdateVisitor } from '@/store/server/features/visitor/mutation';

const { RangePicker } = DatePicker;

// Function to handle edit action

const { TextArea } = Input; // Destructure TextArea from Input

const UserTable = () => {
  const {page,pageSize,setPageSize,setPage}=useUsersStore()
  const {data:unReportedVisitor,isLoading:isUnReportedLoading}=useGetUnApprovedVisitors(page,pageSize)
  const {mutate:editVisitor,isLoading:editVisitorLoading}=useUpdateVisitor();

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState<any>(null);
  const [form] = Form.useForm();
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (id:string) => {
    Modal.confirm({
      title: 'Are you sure you want to approve this visitor?',
      content: 'This action cannot be undone.',
      onOk: () => {
        const newData = { 
          id: id,
          values: {
            status: "approved",
          }
        };
        editVisitor(newData); // Call editVisitor with updated values
      },
      onCancel() {
        console.log('Approval action canceled');
      },
    });
  };


  const handleReject = (id:string) => {
    Modal.confirm({
      title: 'Are you sure you want to reject this visitor?',
      content: (
        <div>
          <TextArea
            rows={4}
            placeholder="Enter rejection reason"
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </div>
      ),
      onOk: () => {
        const newData = { 
          id: id,
          values: {
            status: "Rejected",
            rejected_reason:rejectionReason,
          }
        };
        editVisitor(newData);
        setRejectionReason(''); // Reset the reason after submission
      },
      onCancel() {
        console.log('Rejection action canceled');
      },
      width: 600,
    });
  };

  const handleViewDetails = (visitor:any) => {
    setCurrentVisitor(visitor);
    setIsViewModalVisible(true); // Show the view details modal
  };

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
      title: 'Admin Approval',
      dataIndex: 'status',
      render: (status) => {
      let color;
      let statusText;
  
      if (status==="Approved") {
        color = 'text-green-800 bg-green-200'; // Green for approved
        statusText = "Approved";
      } else if (status ==="Pending") {
        color = 'text-yellow-800 bg-yellow-200'; // Yellow for pending
        statusText = "Pending";
      } else if (status === 'Rejected') {
        color = 'text-red-800 bg-red-200'; // Red for rejected
        statusText = "Rejected";
      } else {
        return null; // Handle unexpected values
      }
  
      return <span className={`${color} px-4 py-1`}>{statusText}</span>;
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
          <Button className='bg-green-300 text-green-900' onClick={() => handleApprove(record.id)}>Approve</Button>
          <Button className='bg-red-300 text-red-900' onClick={() => handleReject(record.id)}>Reject</Button>
          <Button className='bg-blue-300 text-blue-900' onClick={() => handleViewDetails(record)}>
            <FaEye />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-2">
      <Table
        className="w-full"
        columns={columns}
        loading={isUnReportedLoading}
        dataSource={unReportedVisitor?.data || []}
        pagination={{
          current: unReportedVisitor?.current_page,
          pageSize: unReportedVisitor?.per_page,
          total: unReportedVisitor?.total,
          onChange: (page, pageSize) => {
           setPage(page);
           setPageSize(pageSize);
          },
        }}
        scroll={{ x: 'max-content' }} // Enable horizontal scrolling
      />

      {/* View Details Modal */}
      <Modal
        title="Visitor Details"
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={800} // Set a larger width for the modal
      >
        {currentVisitor && (
          <div className="flex justify-start ml-[10%] items-center space-x-4 mb-6">
            <Avatar src={currentVisitor?.avatar_url} size={100} /> {/* Larger avatar */}
            <div>
              <p className="text-2xl font-semibold">{currentVisitor?.name}</p>
              <p className="text-lg text-gray-600">{currentVisitor?.company_name}</p> {/* Display company name */}
            </div>
          </div>
        )}
        <div className='flex justify-center'>
            <div className="grid grid-cols-2 gap-4 justify-center">
              <div>
                <p className="font-medium"><strong>Contact Number:</strong></p>
                <p>{currentVisitor?.contact_number}</p>
              </div>
              <div>
                <p className="font-medium"><strong>Identification Type:</strong></p>
                <p>{currentVisitor?.identification_type}</p>
              </div>
              <div>
                <p className="font-medium"><strong>Identification Number:</strong></p>
                <p>{currentVisitor?.identification_number}</p>
              </div>
              <div>
                <p className="font-medium"><strong>Purpose:</strong></p>
                <p>{currentVisitor?.purpose}</p>
              </div>
              <div>
                <p className="font-medium"><strong>Expected Start Date:</strong></p>
                <p>{dayjs(currentVisitor?.expected_start_date).format(DATE_FORMAT_IN_NUMBER)}</p>
              </div>
              <div>
                <p className="font-medium"><strong>Expected End Date:</strong></p>
                <p>{dayjs(currentVisitor?.expected_end_date).format(DATE_FORMAT_IN_NUMBER)}</p>
              </div>
              <div>
                <p className="font-medium"><strong>Admin Approval:</strong></p>
                <p>{currentVisitor?.admin_approval ? 'Approved' : 'Pending'}</p>
              </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
