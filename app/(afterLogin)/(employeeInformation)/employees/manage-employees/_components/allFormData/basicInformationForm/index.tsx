'use client';

import React from 'react';
import {
  Col,
  DatePicker,
  Form,
  Input,
  Image,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useGetNationalities } from '@/store/server/features/employees/employeeManagment/nationality/querier';
import { validateEmail, validateName } from '@/utils/validation';
import { UploadFile } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import { useEmployeeManagementStore } from '@/store/uistate/features/employees/employeeManagment';

const { Option } = Select;
const { Dragger } = Upload;

const BasicInformationForm = ({ form }: any) => {
  const { profileFileList, setProfileFileList } = useEmployeeManagementStore();
  const { data: nationalities, isLoading: isLoadingNationality } =
    useGetNationalities();

  type FileInfo = {
    file: UploadFile; // File being uploaded
    fileList: UploadFile[]; // List of all files
  };

  const beforeProfileUpload = (file: RcFile): boolean => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const handleProfileChange = (info: FileInfo) => {
    setProfileFileList(info.fileList);
    if (info.file.status === 'done') {
      form.setFieldsValue({ profileImage: info });
    }
  };

  const handleProfileRemove = (file: UploadFile) => {
    const updatedFileList = profileFileList.filter(
      (item: any) => item.uid !== file.uid,
    );
    setProfileFileList(updatedFileList);

    form.setFieldsValue({
      profileImage: updatedFileList.length > 0 ? updatedFileList : null,
    });
  };

  const getImageUrl = (fileList: UploadFile[]): string => {
    if (fileList.length > 0) {
      const imageFile = fileList[0];
      return (
        imageFile?.url ||
        imageFile?.thumbUrl ||
        URL.createObjectURL(imageFile.originFileObj as RcFile) ||
        ''
      );
    }
    return '';
  };
  return (
    <div className="">
      <Row justify="center" style={{ width: '100%' }}>
        <Col span={24}>
          <Form.Item
            className="font-semibold text-xs"
            label="Upload Profile"
            style={{ textAlign: 'center' }}
            name="profileImage"
            id="profileImageId"
            rules={[
              { required: true, message: 'Please upload your profile image!' },
            ]}
          >
            <Dragger
              name="files"
              fileList={profileFileList}
              beforeUpload={beforeProfileUpload}
              onChange={handleProfileChange}
              onRemove={handleProfileRemove}
              accept="image/*"
              maxCount={1}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
            >
              {profileFileList.length > 0 ? (
                <Image
                  src={getImageUrl(profileFileList)}
                  alt="Uploaded Preview"
                  className="w-full h-auto max-h-64 object-cover rounded-xl"
                />
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text font-semibold text-xs">
                    Upload Your Profile
                  </p>
                  <p className="ant-upload-hint text-xs">
                    or drag and drop it here.
                  </p>
                </>
              )}
            </Dragger>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            className="font-semibold text-xs"
            name="userFirstName"
            label="First Name"
            id="userFirstNameId"
            rules={[
              {
                validator: (rule, value) =>
                  !validateName('name', value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(validateName('name', value) || ''),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            className="font-semibold text-xs"
            name="userMiddleName"
            label="Middle Name"
            id="userMiddleNameId"
            rules={[
              {
                validator: (rule, value) =>
                  !validateName('Middle Name', value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(validateName('Middle Name', value) || ''),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            className="font-semibold text-xs"
            name="userLastName"
            label="Last Name"
            id="userLastNameId"
            rules={[
              {
                validator: (rule, value) =>
                  !validateName('Last Name', value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(validateName('Last Name', value) || ''),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs"
            name="userEmail"
            label="Email Address"
            id="userEmailId"
            rules={[
              {
                validator: (rule, value) =>
                  !validateEmail(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error(validateEmail(value) || '')),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs"
            name="employeeGender"
            label="Gender"
            id="userEmployeeGenderId"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an option" allowClear>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs"
            name="dateOfBirth"
            label="Date of Birth"
            id="userDateOfBirthId"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs"
            name="nationalityId"
            label="Nationality"
            id="userNationalityId"
            rules={[{ required: true }]}
          >
            <Select
              loading={isLoadingNationality}
              placeholder="Select an option"
              allowClear
            >
              {nationalities?.items?.map((nationality: any, index: number) => (
                <Option key={index} value={nationality?.id}>
                  {nationality?.name}
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
            name="martialStatus"
            label="Marital Status"
            id="userMartialStatusId"
            rules={[
              { required: true, message: 'Please select a marital status!' },
            ]}
          >
            <Select placeholder="Select an option" allowClear>
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
              <Option value="divorced">Divorced</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformationForm;
