'use client';
import CustomBreadcrumb from '@/components/common/breadCramp';
import React from 'react';
import BlockWrapper from '@/components/common/blockWrapper/blockWrapper';
import UserSidebar from './_components/userSidebar';
import EmployeeSearch from '@/components/common/search/employeeSearch';
import UserTable from './_components/userTable';
import { useUsersStore } from '@/store/uistate/features/users';

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
            subtitle="Manage your Visitor Log List"
          />
          <div className="flex flex-wrap justify-start items-center my-4 gap-4 md:gap-8">
            <UserSidebar onClose={onClose} />
          </div>
        </div>
        <div className="w-full h-auto">
          <EmployeeSearch />
          <UserTable />
        </div>
      </BlockWrapper>
    </div>
  );
};

export default Visitors;
