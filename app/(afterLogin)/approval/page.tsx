'use client';
import CustomBreadcrumb from '@/components/common/breadCramp';
import CustomButton from '@/components/common/buttons/customButton';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import BlockWrapper from '@/components/common/blockWrapper/blockWrapper';
import EmployeeSearch from '@/components/common/search/employeeSearch';
import UserTable from './_components/userTable';

const Approval: React.FC<any> = () => {


  return (
    <div className="h-auto w-full p-4">
      <BlockWrapper>
        <div className="flex flex-wrap justify-between items-center">
          <CustomBreadcrumb
            title="Users"
            subtitle="Manage your Users"
          />
          <div className="flex flex-wrap justify-start items-center my-4 gap-4 md:gap-8">
            <CustomButton
              title="Create user"
              id="createUserButton"
              icon={<FaPlus className="mr-2" />}
              // onClick={showDrawer}
              className="bg-blue-600 hover:bg-blue-700"
            />
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

export default Approval;
