'use client';
import { useJobState } from '@/store/uistate/features/recruitment/jobs';
import { Form, Steps } from 'antd';
import React from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDebounce } from '@/utils/useDebounce';
import { v4 as uuidv4 } from 'uuid';
import { useCreateJobs } from '@/store/server/features/recruitment/job/mutation';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import dayjs from 'dayjs';
import CustomDrawerLayout from '@/components/common/customDrawer';
import CreateNewJob from './createNewJob';
import CreateApplicationForm from './createApplicationForm';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';

const { Step } = Steps;

const CreateJobs: React.FC = () => {
  const [form] = Form.useForm();
  const createdBy = useAuthenticationStore.getState().userId;
  const {
    addNewDrawer,
    currentStep,
    setFormValues,
    setAddNewDrawer,
    setCurrentStep,
    setAddJobModalResult,
    setSelectedJobId,
    filteredQuestions,
  } = useJobState();
  const { mutate: createJob } = useCreateJobs();

  const customDot = (step: number) => (
    <div
      className={`border-2 rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= step ? 'bg-indigo-700 text-white' : 'bg-white border-gray-300 text-gray-500'}`}
    >
      <div style={{ fontSize: '24px', lineHeight: '24px' }}>
        {currentStep >= step ? (
          <IoCheckmarkSharp className="text-xs font-bold" />
        ) : (
          '•'
        )}
      </div>
    </div>
  );
  const handleStepChange = (value: number) => {
    setCurrentStep(value);
  };
  const addNewDrawerHeader = (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between">
        <Steps
          current={currentStep}
          onChange={handleStepChange}
          size="default"
          className="w-full"
        >
          <Step icon={customDot(0)} />
          <Step icon={customDot(1)} />
        </Steps>
      </div>
      {currentStep === 0 ? (
        <div className="flex justify-center text-xl font-extrabold text-gray-800 p-4">
          Create New Job
        </div>
      ) : (
        <div className="flex justify-center text-xl font-extrabold text-gray-800 p-4">
          Create Application Forms
        </div>
      )}
    </div>
  );
  const handleCloseDrawer = () => {
    setAddNewDrawer(false);
    form.resetFields();
  };

  const handleAddJobStateUpdate = useDebounce(setFormValues, 1500);

  const handlePublish = async () => {
    try {
      const formValues = form.getFieldsValue();

      const formattedValue = {
        ...formValues,
        createdBy,
        jobDeadline: dayjs(formValues?.jobDeadline).toISOString(),
        yearOfExperience: Number(formValues?.yearOfExperience),
        departmentId: formValues?.department,
        questions: [
          ...(formValues?.questions?.map((e: any) => {
            return {
              ...e,
              required: e?.required || false,
              id: uuidv4(),
              field: e.field.map((field: any) => {
                return {
                  id: uuidv4(),
                  value: field,
                };
              }),
            };
          }) || []),
          ...(filteredQuestions?.map((e: any) => {
            return {
              ...e,
              required: e.required || false,
            };
          }) || []),
        ],
      };
      createJob(formattedValue, {
        onSuccess: (response) => {
          const newJobId = response?.id;
          setSelectedJobId(newJobId);
          setAddJobModalResult(true);
          setAddNewDrawer(false);
        },
      });
      // setAddJobModalResult(true);
      // createJob(formattedValue);
      // setAddNewDrawer(false);
    } catch {
      NotificationMessage.error({
        message: 'Publish Failed',
        description: 'There was an error publishing Add new Job.',
      });
    }
  };

  return (
    addNewDrawer && (
      <CustomDrawerLayout
        open={addNewDrawer}
        onClose={handleCloseDrawer}
        modalHeader={addNewDrawerHeader}
        width="40%"
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={() => {
            handleAddJobStateUpdate(form.getFieldsValue());
          }}
          onFinish={() => {
            handlePublish();
          }}
        >
          <div style={{ height: 'auto' }} hidden={currentStep !== 0}>
            <CreateNewJob
              form={form}
              close={handleCloseDrawer}
              stepChange={handleStepChange}
            />
          </div>
          <div hidden={currentStep !== 1}>
            <CreateApplicationForm form={form} stepChange={handleStepChange} />
          </div>
        </Form>
      </CustomDrawerLayout>
    )
  );
};

export default CreateJobs;
