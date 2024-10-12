import React from 'react';
import { Card, Col, Form, Row, Button, DatePicker, Select } from 'antd';
import {
  EditState,
  useEmployeeManagementStore,
} from '@/store/uistate/features/employees/employeeManagment';
import { useGetEmployee } from '@/store/server/features/employees/employeeManagment/queries';
import { LuPencil } from 'react-icons/lu';
import { useGetNationalities } from '@/store/server/features/employees/employeeManagment/nationality/querier';
import { InfoLine } from '../../common/infoLine';
import dayjs from 'dayjs';

function PersonalDataComponent({
  id,
  handleSaveChanges,
}: {
  id: string;
  handleSaveChanges: any;
}) {
  const { setEdit, edit } = useEmployeeManagementStore();
  const [form] = Form.useForm();
  const { isLoading, data: employeeData } = useGetEmployee(id);
  const { data: nationalities, isLoading: isLoadingNationality } =
    useGetNationalities();

  const handleEditChange = (editKey: keyof EditState) => {
    setEdit(editKey);
  };
  return (
    <Card
      loading={isLoading}
      title="Personal Info"
      extra={
        <LuPencil
          className="cursor-pointer text-black"
          color="#BFBFBF"
          onClick={() => handleEditChange('general')}
        />
      }
      className="my-6 mt-0"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSaveChanges('general', values)}
        initialValues={{
          dateOfBirth: employeeData?.employeeInformation?.dateOfBirth
            ? dayjs(employeeData.employeeInformation.dateOfBirth)
            : null,
          nationalityId: employeeData?.employeeInformation?.nationalityId,
          maritalStatus: employeeData?.employeeInformation?.maritalStatus,
          joinedDate: employeeData?.employeeInformation?.joinedDate
            ? dayjs(employeeData.employeeInformation.joinedDate)
            : null,
          gender: employeeData?.employeeInformation?.gender,
        }}
      >
        <Row gutter={[16, 24]}>
          {edit.general ? (
            <>
              <Col lg={12}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  className="text-gray-950 text-xs w-full"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the date of birth',
                    },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item
                  name="nationalityId"
                  label="Nationality"
                  className="text-gray-950 text-xs"
                  rules={[
                    { required: true, message: 'Please enter the nationality' },
                  ]}
                >
                  <Select
                    loading={isLoadingNationality}
                    placeholder="Select Nationality"
                  >
                    {nationalities?.items?.map((nationality: any) => (
                      <Select.Option
                        key={nationality.id}
                        value={nationality.id}
                      >
                        {nationality.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="maritalStatus"
                  label="Marital Status"
                  className="text-gray-950 text-xs"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the marital status',
                    },
                  ]}
                >
                  <Select placeholder="Select Marital Status">
                    <Select.Option value="MARRIED">Married</Select.Option>
                    <Select.Option value="SINGLE">Single</Select.Option>
                    <Select.Option value="DIVORCED">Divorced</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={10}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  className="text-gray-950 text-xs"
                  rules={[
                    { required: true, message: 'Please enter the gender' },
                  ]}
                >
                  <Select placeholder="Select Gender">
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="male">Male</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="joinedDate"
                  label="Joined Date"
                  className="text-gray-950 text-xs w-full"
                  rules={[
                    { required: true, message: 'Please enter the joined date' },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col lg={12}>
                <InfoLine
                  title="Full Name"
                  value={`${employeeData?.firstName} ${employeeData?.middleName} ${employeeData?.lastName}`}
                />
                <InfoLine
                  title="Date of Birth"
                  value={
                    dayjs(
                      employeeData?.employeeInformation?.dateOfBirth,
                    ).format('DD MMMM, YYYY') || '-'
                  }
                />
                <InfoLine
                  title="Nationality"
                  value={
                    employeeData?.employeeInformation?.nationality?.name || '-'
                  }
                />
              </Col>
              <Col lg={10}>
                <InfoLine
                  title="Gender"
                  value={employeeData?.employeeInformation?.gender || '-'}
                />
                <InfoLine
                  title="Marital Status"
                  value={
                    employeeData?.employeeInformation?.maritalStatus || '-'
                  }
                />
                <InfoLine
                  title="Joined Date"
                  value={
                    dayjs(
                      employeeData?.employeeInformation?.joinedDate,
                    )?.format('DD MMMM, YYYY') || '-'
                  }
                />
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Card>
  );
}

export default PersonalDataComponent;
