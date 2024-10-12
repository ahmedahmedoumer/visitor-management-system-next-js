'use client';
import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import AddFormResult from '../../modals/result';
import ShareToSocialMedia from '../../modals/share';
import { EmploymentType, LocationType } from '@/types/enumTypes';
import { useGetDepartments } from '@/store/server/features/employees/employeeManagment/department/queries';

const { Option } = Select;

interface CreateJobsProps {
  close: () => void;
  form: FormInstance;
  stepChange: (value: number) => void;
}
const CreateNewJob: React.FC<CreateJobsProps> = ({ close, stepChange }) => {
  const { data: departments, isLoading: isDepartmentLoading } =
    useGetDepartments();

  return (
    <>
      <Form.Item
        name="jobTitle"
        label={
          <span className="text-md my-2 font-semibold text-gray-700">
            Job Name
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input the job name!',
          },
        ]}
      >
        <Input
          size="large"
          placeholder="Job title"
          className="text-sm w-full  h-10"
          allowClear
        />
      </Form.Item>
      <Row gutter={16}>
        <Col lg={8} sm={24} md={24} xs={24} xl={8}>
          <Form.Item
            name="employmentType"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Employment Type
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the employment type!',
              },
            ]}
          >
            <Select
              placeholder="Employment type"
              className="text-sm w-full h-10"
            >
              {EmploymentType &&
                Object?.values(EmploymentType).map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col lg={8} sm={24} md={24} xs={24} xl={8}>
          <Form.Item
            name="department"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Department
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the department!',
              },
            ]}
          >
            <Select placeholder="Department" className="text-sm w-full h-10">
              {isDepartmentLoading && (
                <div className="flex items-center justify-center h-30">
                  <Spin size="small" />
                </div>
              )}
              {departments &&
                departments.map((dep: any) => (
                  <Option key={dep?.id} value={dep?.id}>
                    {dep?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col lg={8} sm={24} md={24} xs={24} xl={8}>
          <Form.Item
            name="jobLocation"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Location
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the location!',
              },
            ]}
          >
            <Select placeholder="Location" className="text-sm w-full h-10">
              {Object.values(LocationType).map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="yearOfExperience"
        label={
          <span className="text-md my-2 font-semibold text-gray-700">
            Years of Experience
          </span>
        }
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Please input the years of experience!',
            transform: (value) => (value ? Number(value) : value),
          },
        ]}
      >
        <InputNumber
          size="large"
          placeholder="0"
          className="text-sm w-full h-10"
        />
      </Form.Item>
      <Row gutter={16}>
        <Col xs={24} sm={24} lg={24} md={12} xl={12}>
          <Form.Item
            name="jobStatus"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Job Status
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the job status',
              },
            ]}
          >
            <Select placeholder="Job status" className="text-sm w-full h-10">
              <Option value="Open">Open</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} lg={24} md={12} xl={12}>
          <Form.Item
            name="compensation"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Compensation
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the compensation!',
              },
            ]}
          >
            <Select placeholder="Compensation" className="text-sm w-full h-10">
              {EmploymentType &&
                Object?.values(EmploymentType).map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} lg={24} md={24} xl={12}>
          <Form.Item
            name="quantity"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Quantity
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the quantity!',
              },
            ]}
          >
            <InputNumber
              size="large"
              placeholder="0"
              className="text-sm w-full h-10"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} lg={24} md={24} xl={12}>
          <Form.Item
            name="jobDeadline"
            label={
              <span className="text-md my-2 font-semibold text-gray-700">
                Expected Closing Date
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input the expected closing date!',
              },
            ]}
          >
            <DatePicker className="text-sm w-full h-10" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="description"
        label={
          <span className="text-md my-2 font-semibold text-gray-700">
            Description
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input the description!',
          },
        ]}
      >
        <TextArea rows={4} placeholder="Description" />
      </Form.Item>

      <AddFormResult />
      <ShareToSocialMedia />

      <Form.Item>
        <div className="flex justify-center absolute w-full bg-[#fff] px-6 py-6 gap-6">
          <Button
            onClick={close}
            className="flex justify-center text-sm font-medium text-gray-800 bg-white p-4 px-10 h-12 hover:border-gray-500 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={() => stepChange(1)}
            className="flex justify-center text-sm font-medium text-white bg-primary p-4 px-10 h-12"
          >
            Next
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default CreateNewJob;
