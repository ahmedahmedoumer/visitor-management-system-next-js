import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Input, Popconfirm, Row, Select } from 'antd';
import CustomDrawerLayout from '@/components/common/customDrawer';
import { FaPlus } from 'react-icons/fa';
import { useOrganizationalDevelopment } from '@/store/uistate/features/organizationalDevelopment';
import {
  useCreateActionPlan,
  useUpdateActionPlan,
} from '@/store/server/features/organization-development/categories/mutation';
import { useGetAllUsers } from '@/store/server/features/employees/employeeManagment/queries';
import { TiDeleteOutline } from 'react-icons/ti';
import Image from 'next/image';
import { useGetActionPlanById } from '@/store/server/features/organization-development/categories/queries';
import Avatar from '@/public/gender_neutral_avatar.jpg';

const { Option } = Select;

const CreateActionPlan = (props: any) => {
  const [form] = Form.useForm();
  const {
    numberOfActionPlan,
    setNumberOfActionPlan,
    selectedEditActionPlan,
    setSelectedEditActionPlan,
    open,
    setOpen,
  } = useOrganizationalDevelopment();
  const { mutate: createActionPlanData, isLoading } = useCreateActionPlan();
  const { mutate: updateActionPlanData } = useUpdateActionPlan();
  const { data: singleActionPlanData } = useGetActionPlanById(
    selectedEditActionPlan || '',
  );
  const { data: employeeData, isLoading: userLoading } = useGetAllUsers();

  const modalHeader = (
    <div className="flex justify-center text-xl font-extrabold text-gray-800 p-4">
      Add New Action Plan
    </div>
  );

  const plusOnClickHandler = () => {
    setNumberOfActionPlan(numberOfActionPlan + 1);
  };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setSelectedEditActionPlan(null);
    setNumberOfActionPlan(1);
  };
  const handleOnFinishActionPlan = (values: any) => {
    const arrayOfObjects = Object.keys(values).map((key: any) => values[key]);
    createActionPlanData(
      { formId: props?.id, values: arrayOfObjects }, // Pass both formId and values together
      {
        onSuccess: () => {
          form.resetFields(); // Resets the form after successful creation
          setOpen(false); // Closes the modal or form
        },
      },
    );
  };
  useEffect(() => {
    if (selectedEditActionPlan && singleActionPlanData) {
      form.setFieldsValue({
        0: {
          actionToBeTaken: singleActionPlanData?.actionToBeTaken || '',
          description: singleActionPlanData?.description || '',
          responsiblePerson: singleActionPlanData?.responsiblePerson || '',
          status: singleActionPlanData?.status || '',
        },
      });
    }
  }, [selectedEditActionPlan, singleActionPlanData, form]);

  const handleOnUpdateActionPlan = (values: any) => {
    updateActionPlanData(
      { actionPlanId: selectedEditActionPlan, values: values[0] }, // Pass both formId and values together
      {
        onSuccess: () => {
          form.resetFields();
          setSelectedEditActionPlan(null); // Resets the selected action plan after successful update
          setOpen(false); // Closes the modal or form
        },
      },
    );
  };
  const handleOnFinish = (values: any) => {
    selectedEditActionPlan
      ? handleOnUpdateActionPlan(values)
      : handleOnFinishActionPlan(values);
  };
  return (
    open && (
      <CustomDrawerLayout
        open={open}
        onClose={props?.onClose}
        modalHeader={modalHeader}
        width="40%"
      >
        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{ maxWidth: '100%' }}
          layout="vertical"
          onFinish={handleOnFinish}
        >
          {/* eslint-disable @typescript-eslint/naming-convention  */}
          {Array.from({ length: numberOfActionPlan }, (__, index) => (
            <Card
              key={index}
              title={
                <div
                  className="flex justify-end text-red-600 cursor-pointer"
                  onClick={() => setNumberOfActionPlan(numberOfActionPlan - 1)}
                >
                  <TiDeleteOutline />
                </div>
              }
            >
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Form.Item
                    className="font-semibold text-xs"
                    name={[`${index}`, 'actionToBeTaken']}
                    label={`Action plan ${index + 1}`}
                    id={`actionPlanId${index + 1}`}
                    rules={[
                      { required: true, message: 'action title is required' },
                      {
                        max: 40, // Set the maximum number of characters allowed
                        message: 'Action title cannot exceed 40 characters',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Form.Item
                    className="font-semibold text-xs"
                    name={[`${index}`, 'description']}
                    label={`Description`}
                    id={`actionPlanDescription${index + 1}`}
                    rules={[
                      { required: true, message: 'description is required' },
                      {
                        max: 40, // Set the maximum number of characters allowed
                        message: 'description cannot exceed 40 characters',
                      },
                    ]}
                  >
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Form.Item
                    className="font-semibold text-xs"
                    name={[`${index}`, 'responsiblePerson']}
                    label={`Responsible Person`}
                    id={`responsiblePersonId${index + 1}`}
                    rules={[
                      {
                        required: true,
                        message: 'Responsible Person is required',
                      },
                    ]}
                  >
                    <Select
                      id={`selectStatusChartType`}
                      placeholder="Responsible Person"
                      allowClear
                      loading={userLoading}
                      className="w-full my-4"
                    >
                      {employeeData?.items?.map((item: any) => (
                        <Option key="active" value={item.id}>
                          <div className="flex space-x-3 p-1 rounded">
                            <Image
                              src={item?.profileImage ?? Avatar}
                              alt="pep"
                              className="rounded-full w-4 h-4 mt-2"
                              width={15}
                              height={15}
                            />
                            <span className="flex justify-center items-center">
                              {item?.firstName + ' ' + ' ' + item?.middleName}
                            </span>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24}>
                  <Form.Item
                    className="font-semibold text-xs"
                    name={[`${index}`, 'status']}
                    label={`Status`}
                    id={`statusId${index + 1}`}
                    rules={[
                      {
                        required: true,
                        message: 'Status required',
                      },
                    ]}
                  >
                    <Select
                      id={`selectStatusChartType`}
                      placeholder="select status"
                      allowClear
                      className="w-full my-4"
                    >
                      <Option key="active" value={'pending'}>
                        Pending
                      </Option>
                      <Option key="active" value={'solved'}>
                        Solved
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}
          <Row gutter={16} className="my-5">
            <Col className="flex justify-center" xs={24} sm={24}>
              <Button type="primary" onClick={plusOnClickHandler}>
                <FaPlus />
              </Button>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} className="flex justify-end">
              <Popconfirm
                title="reset all you filled"
                description="Are you sure to reset all fields value ?"
                onConfirm={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button name="cancelSidebarButtonId" className="p-4" danger>
                  Cancel
                </Button>
              </Popconfirm>
            </Col>
            <Col xs={24} sm={12}>
              <Button
                loading={isLoading}
                htmlType="submit"
                name="createActionButton"
                id="createActionButtonId"
                className="px-6 py-3 text-xs font-bold"
                type="primary"
              >
                {selectedEditActionPlan ? 'Edit' : 'Create'}
              </Button>
            </Col>
          </Row>
        </Form>
      </CustomDrawerLayout>
    )
  );
};

export default CreateActionPlan;
