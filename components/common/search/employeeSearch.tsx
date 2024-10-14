'use client';
import React from 'react';
import { Select } from 'antd';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';

const { Option } = Select;
interface Option {
  key: string;
  value: string;
}

interface EmployeeSearchProps {
  optionArray1?: any;
  optionArray2?: Option[];
  optionArray3?: any;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({
  optionArray2,
  optionArray1,
  optionArray3,
}) => {
  const { userId } = useAuthenticationStore();
  const onSearchChange = (value: any, key: string, isSelect: boolean) => {
    
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full pb-4">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-1/2 p-2">
          <Select
            placeholder="Select Employee"
            onChange={(value) => onSearchChange(value, 'employee', true)}
            allowClear
            showSearch
            className="w-full h-14"
            optionFilterProp="children" // Defines which part of the Option is filtered
            filterOption={(input: any, option: any) => {
              const optionText = option?.children?.toString(); // Ensure it's a string
              return optionText?.toLowerCase().includes(input.toLowerCase());
            }}
          >
            {optionArray1?.map((item: any) => {
              let displayFirstName = item.firstName || ''; // Handle null firstName
              let displayMiddleName = item.middleName || ''; // Handle null middleName

              // Truncate long names
              const maxNameLength = 10;
              if (displayFirstName.length > maxNameLength) {
                displayFirstName =
                  displayFirstName.substring(0, maxNameLength) + '...';
              }
              if (displayMiddleName.length > maxNameLength) {
                displayMiddleName =
                  displayMiddleName.substring(0, maxNameLength) + '...';
              }

              // Construct full name
              const fullName =
                displayFirstName || displayMiddleName
                  ? `${displayFirstName} ${displayMiddleName}`.trim()
                  : 'Unnamed Employee'; // Fallback name

              return (
                <Option value={item.id} key={item.id}>
                  {fullName}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="w-full md:w-1/4 p-2" id="subscriptionTypeFilter">
          <Select
            placeholder="Select Type"
            onChange={(value) => onSearchChange(value, 'type', true)}
            allowClear
            className="w-full h-14"
          >
            {optionArray2?.map((item, index) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className="w-full md:w-1/4 p-2" id="subscriptionStatusFilter">
          <Select
            placeholder="status"
            onChange={(value) => onSearchChange(value, 'status', true)}
            allowClear
            className="w-full h-14"
          >
            {optionArray3?.map((item: any, index: number) => (
              <Option key={index} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearch;
