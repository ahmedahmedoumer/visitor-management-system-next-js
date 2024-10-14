'use client';
import CustomBreadcrumb from '@/components/common/breadCramp';
import CustomButton from '@/components/common/buttons/customButton';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import BlockWrapper from '@/components/common/blockWrapper/blockWrapper';
import UserSidebar from './_components/userSidebar';
import EmployeeSearch from '@/components/common/search/employeeSearch';
import UserTable from './_components/userTable';
import { useUsersStore } from '@/store/uistate/features/users';
import { useGetAllUsers } from '@/store/server/features/user/queries';
import { VISITOR_MANAGMENT_URL } from '@/utils/constants';

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
            title="Visitor"
            subtitle="Manage your Visitor"
          />
          <div className="flex flex-wrap justify-start items-center my-4 gap-4 md:gap-8">
            <CustomButton
              title="Create Visitor"
              id="createVisitorButton"
              icon={<FaPlus className="mr-2" />}
              onClick={showDrawer}
              className="bg-blue-600 hover:bg-blue-700"
            />
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
