import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Checkbox
} from 'antd';
import { useVisitorsStore } from '@/store/uistate/features/visitor';
import { useGetAllVisitorLogs } from '@/store/server/features/visitorLogs/queries';
import { useCheckInVisitor, useCheckOutVisitor } from '@/store/server/features/visitorLogs/mutation';

// Function to handle edit action

const UserTable = () => {
  const {page,pageSize,setPageSize,setPage}=useVisitorsStore()
  const {data:allVisitorLogs,isLoading:visitorLogLoading}=useGetAllVisitorLogs(page,pageSize)
  const {mutate:checkOut,isLoading:checkOutLoading}=useCheckOutVisitor()
  const {mutate:checkIn,isLoading:checkInLoading}=useCheckInVisitor()


  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState<any>(null);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const columns = [
    {
      title: 'Visitor Name',
      dataIndex: ['visitor', 'name'], // Correctly access the nested property
      key: 'visitor_id',
    },
    {
      title: 'Check-in Time',
      dataIndex: 'checkin_time',
      key: 'checkin_time',
      render: (text: string) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'Check-out Time',
      dataIndex: 'checkout_time',
      key: 'checkout_time',
      render: (text: string) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'Availability Status',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (isAvailable: boolean) => (
        <span className={isAvailable ? 'text-green-600' : 'text-red-600'}>
          {isAvailable ? 'Available' : 'Not Available'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text:any, record:any) => (
        <div className='flex space-x-2'>
          {record.isAvailable ? (
            <Button className='bg-blue-300 text-blue-900' onClick={() => handleCheckOut(record)}>
              Check-out
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  const handleCheckOut = (visitor: any) => {
    setCurrentVisitor(visitor);
    setSelectedProperties([]); // Reset selected properties
    setIsCheckoutModalVisible(true); // Show the checkout modal
  };

  const handleModalOk = () => {
    // Implement the logic to handle the checkout with selected properties
    const newItem={
      id:currentVisitor?.id,
      checkedOutProperty:selectedProperties,
    }
    checkOut(newItem,{
      onSuccess:()=>{
        
      }
    })
    // console.log('Checked out visitor:', currentVisitor, 'with properties:', selectedProperties);
    // setIsCheckoutModalVisible(false); // Close the modal
  };

  const handleModalCancel = () => {
    setIsCheckoutModalVisible(false); // Close the modal
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  return (
    <div className="mt-2">
      <Table
        className="w-full"
        columns={columns}
        loading={visitorLogLoading}
        dataSource={allVisitorLogs?.data || []}
        pagination={{
          current: allVisitorLogs?.current_page,
          pageSize: allVisitorLogs?.per_page,
          total: allVisitorLogs?.total,
          onChange: (page, pageSize) => {
           setPage(page);
           setPageSize(pageSize)
          },
        }}
        scroll={{ x: 1000 }}
      />

      {/* Check-out Modal */}
      <Modal
        title="Check-out Visitor"
        visible={isCheckoutModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600} // Set a larger width for the modal
      >
      {currentVisitor && (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <p className='text-xs text-black'>
            <span className='text-red-500 font-bold'>*</span> The properties held by the owner are listed below. Please review and mark them as checked to complete the process.
          </p>

          <h6 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            {currentVisitor?.visitor?.name}
          </h6>
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>
            <strong>Contact Number:</strong> {currentVisitor?.visitor?.contact_number}
          </p>
          <p style={{ fontSize: '16px', marginBottom: '15px' }}>
            <strong>Purpose:</strong> {currentVisitor?.visitor?.purpose}
          </p>
          <h6 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
            Select Properties to Check Out:
          </h6>
          <div style={{ marginLeft: '10px' }}>
            {currentVisitor?.visitor?.properties?.map((property: any) => (
              <div key={property?.id} style={{ marginBottom: '8px' }}>
                <Checkbox
                  checked={selectedProperties.includes(property?.id)}
                  onChange={() => handlePropertyChange(property?.id)}
                  style={{ fontSize: '16px' }}
                >
                  <span style={{ fontSize: '16px' }}>
                    {property?.property_name} - {property?.description} (Quantity: {property?.quantity})
                  </span>
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      )}

    </Modal>

    </div>
  );
};

export default UserTable;
