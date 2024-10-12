'use client';

import React from 'react';
import { useFetchOffboardItems } from '@/store/server/features/employees/offboarding/queries';
import OffboardingFormControl from '../offboardingFormControl';
import { Col, Row } from 'antd';
import Image from 'next/image';
import avatar from '@/public/gender_neutral_avatar.jpg';

const EmploymentStatus: React.FC = () => {
  const { data: employeeData } = useFetchOffboardItems();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <Row gutter={16} align="middle" className="bg-gray-100 p-2 rounded-sm">
        <Col>
          <Image
            src={employeeData?.avatar || avatar}
            alt={employeeData?.name || 'Employee'}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Col>
        <Col>
          <h2 className="text-base font-semibold mb-0">
            {employeeData?.name ? employeeData?.name : 'Gelila Tegegne'}
          </h2>
          <p className="text-gray-500 mb-0 text-sm">
            {employeeData?.position
              ? employeeData?.position
              : 'Jr. Software Developer'}
          </p>
          <p className="text-sm text-gray-900 mb-0">
            Reports Directly to {''}
            {employeeData?.manager ? employeeData?.manager : 'Abeselom G/kidan'}
          </p>
        </Col>
      </Row>
      <p className="text-base font-semibold my-4">Employment Status</p>
      <OffboardingFormControl />
    </div>
  );
};

export default EmploymentStatus;
