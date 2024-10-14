'use client';
import CustomBreadcrumb from '@/components/common/breadCramp';
import React from 'react';
import BlockWrapper from '@/components/common/blockWrapper/blockWrapper';
import UserSidebar from './_components/userSidebar';
import EmployeeSearch from '@/components/common/search/employeeSearch';
import UserTable from './_components/userTable';
import { useUsersStore } from '@/store/uistate/features/users';
import { FaBarcode } from 'react-icons/fa';
import { Input } from 'antd';

const Visitors: React.FC<any> = () => {
  const { setOpen } = useUsersStore();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="h-auto w-full p-4">
      <BlockWrapper>
        <div className="flex flex-wrap justify-between items-center">
          <CustomBreadcrumb
            title="Visitor Log"
            subtitle="Manage checkin checkout log list"
          />
          <div className="flex flex-wrap justify-start items-center my-4 gap-4 md:gap-8">
            <UserSidebar onClose={onClose} />
          </div>
        </div>
        <div className="w-full h-auto">
        <div className="flex items-center mb-4">
            <Input
              placeholder="Scan or enter barcode"
              className="flex-grow h-12"
              allowClear
              prefix={<FaBarcode className="text-gray-950 text-2xl" />} // Barcode icon as prefix
            />
          </div>
          <UserTable />
        </div>
      </BlockWrapper>
    </div>
  );
};

export default Visitors;
