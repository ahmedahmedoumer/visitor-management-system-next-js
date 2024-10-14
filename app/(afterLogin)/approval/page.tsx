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
            title="Approval"
            subtitle="Manage your Approval"
          />
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
