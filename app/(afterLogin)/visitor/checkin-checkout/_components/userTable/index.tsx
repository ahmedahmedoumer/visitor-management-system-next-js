import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Checkbox,
  Input,
  Row,
  Col,
  Form
} from 'antd';
import { useVisitorsStore } from '@/store/uistate/features/visitor';
import { useGetAllVisitorLogs } from '@/store/server/features/visitorLogs/queries';
import { useCheckInVisitor, useCheckOutVisitor } from '@/store/server/features/visitorLogs/mutation';
import { Material } from '@/store/server/features/visitorLogs/interface';

// Function to handle edit action

const UserTable = () => {
  const { page, pageSize, setPageSize, setPage } = useVisitorsStore();
  const { data: allVisitorLogs, isLoading: visitorLogLoading } = useGetAllVisitorLogs(page, pageSize);
  const { mutate: checkOut, isLoading: checkOutLoading } = useCheckOutVisitor();
  const { mutate: checkIn, isLoading: checkInLoading } = useCheckInVisitor();

  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState<any>(null);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [items, setItems] = useState([{ itemName: '', quantity: '' }]);

  const addItem = () => {
    setItems([...items, { itemName: '', quantity: '' }]); // Add a new item field
  };

  const columns = [
    {
      title: 'Visitor Name',
      dataIndex: ['visitor', 'name'],
      key: 'visitor_id',
    },
    {
      title: 'Check-in Time',
      dataIndex: 'checkin_time',
      key: 'checkin_time',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Check-out Time',
      dataIndex: 'checkout_time',
      key: 'checkout_time',
      render: (text: string) => new Date(text).toLocaleString(),
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
      render: (text: any, record: any) => (
        <div className='flex space-x-2'>
          {record.isAvailable ? (
            <Button className='bg-blue-300 text-blue' onClick={() => handleCheckOut(record)}>
              Check-Out
            </Button>
          ) : 
            <Button className='bg-blue-300 text-green-900' onClick={() => handleCheckIn(record)}>
              Check-In
            </Button>}
        </div>
      ),
    },
  ];
  const handleCheckOut = (visitor: any) => {
    setCurrentVisitor(visitor);
    setSelectedProperties([]); // Reset selected properties
    setIsCheckoutModalVisible(true); // Show the checkout modal
  };

  const handleCheckIn = (visitor: any) => {
    setCurrentVisitor(visitor);
    setItems([{ itemName: '', quantity: '' }]); // Reset items for new check-in
    setIsCheckInModalVisible(true); // Show the check-in modal
  };

  const handleModalOk = () => {
    const newItem = {
      id: currentVisitor?.visitor_id,
      checkedOutProperty: selectedProperties,
    };

    checkOut(newItem, {
      onSuccess: () => {
        // Optionally refresh visitor logs or handle success
        setIsCheckoutModalVisible(false);
        setSelectedProperties([]); // Reset selected properties
      },
      onError: (error) => {
        // Handle error
        console.error("Check-out error:", error);
      }
    });
  };

  const handleModalCancel = () => {
    setIsCheckoutModalVisible(false); // Close the modal
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };
  
  const handleCheckInModalOk = () => {
    const newProperties= items.map(item=> ({
      property_name: item?.itemName, // Assuming itemName is used as ID, adjust if necessary
      owner: currentVisitor?.visitor_id,
      status: 'available',
      quantity: `${item?.quantity}`,
    }));
    // Call the checkIn mutation with the new properties
    checkIn(
      { id: currentVisitor?.visitor_id, values: newProperties },
      {
        onSuccess: () => {
          // Optionally refresh visitor logs or handle success
          setIsCheckInModalVisible(false);
          setItems([{ itemName: '', quantity: '' }]); // Reset items
        },
        onError: (error) => {
          // Handle error
          console.error("Check-in error:", error);
        },
      }
    );
  };

  const handleItemChange = (index: number, field: 'itemName' | 'quantity', value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems); 
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
      <>
    <Modal
      title="Check-In Visitor"
      visible={isCheckInModalVisible}
      onOk={handleCheckInModalOk}
      onCancel={() => setIsCheckInModalVisible(false)}
      width={700}
    >
      {currentVisitor && (
        <Form layout="vertical">
          <h6>{currentVisitor?.visitor?.name}</h6>
          {items.map((item, index) => (
            <Row key={index} style={{ marginBottom: '10px' }}>
              <Col span={16}> 
                <Form.Item label="Item Name">
                  <Input
                    className='h-10'
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}> 
                <Form.Item label="Quantity">
                  <Input
                    placeholder="Quantity"
                    type="number"
                    className='h-10'
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={2} className='mt-6'>
                <Button type="link" danger onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button type="dashed" onClick={addItem} style={{ width: '100%', marginTop: '10px' }}>
            Add Item
          </Button>
        </Form>
      )}
    </Modal>
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
    </>
    </div>
  );
};

export default UserTable;
