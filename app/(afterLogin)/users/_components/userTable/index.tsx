import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableColumnsType,
} from 'antd';
import { useGetAllUsers } from '@/store/server/features/user/queries';
import { useUsersStore } from '@/store/uistate/features/users';



// Function to handle edit action


const UserTable = () => {
  const {page,pageSize,setPageSize,setPage}=useUsersStore()
  const {data:allUsersData,isLoading:userLoading}=useGetAllUsers(page,pageSize);

  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => role ? role.name : 'N/A',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      // sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      // sorter: (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className='flex space-x-2'>
          <Button className='bg-green-300 text-green-900' onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button className='bg-red-300 text-red-900' onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];


  const handleEdit = (id:string) => {
    console.log("Edit user with id:", id);
    // Implement edit functionality here
  };
  
  const handleDelete = (id:string) => {
    console.log("Delete user with id:", id);
    // Implement delete functionality here
  };

  return (
    <div className="mt-2">
      <Table
        className="w-full"
        columns={columns}
        dataSource={allUsersData?.data || []}
        pagination={{
          current: allUsersData?.current_page,
          pageSize: allUsersData?.per_page,
          total: allUsersData?.total,
          onChange: (page, pageSize) => {
           setPage(page);
           setPageSize(pageSize)
          },
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default UserTable;
