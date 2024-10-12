import { Col, Form, Row, Input } from 'antd';
import React from 'react';
import DynamicFormFields from '../../dynamicFormDisplayer';
import AddCustomField from '../../addCustomField';
import UseSetCategorizedFormData from '../../customField';
import { validateName } from '@/utils/validation';

const BankInformationForm = () => {
  const currentBankForm = UseSetCategorizedFormData('bankInformation');

  return (
    <div>
      <div className="text-gray-950 text-sm font-semibold mb-4 text-center">
        Bank Account
      </div>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs w-full"
            name={['bankInformation', 'bankName']}
            id="bankInformationBankName"
            label="Bank Name"
            rules={[
              {
                validator: (rule, value) =>
                  !validateName('Bank Name', value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(validateName('Bank Name', value) || ''),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs w-full"
            name={['bankInformation', 'branch']}
            id="bankInformationBranch"
            label="Branch"
            rules={[
              {
                validator: (rule, value) =>
                  !validateName('Branch', value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(validateName('Branch', value) || ''),
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
            className="font-semibold text-xs w-full"
            name={['bankInformation', 'accountName']}
            label="Account Name"
            id="bankInformationAccountName"
            rules={[
              {
                validator: (rule, value) =>
                  !validateName('Account Name', value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(validateName('Account Name', value) || ''),
                      ),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            className="font-semibold text-xs w-full"
            name={['bankInformation', 'accountNumber']}
            id="bankInformationAccountNumber"
            label="Account Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <DynamicFormFields
        formTitle="bankInformation"
        fields={currentBankForm.form}
      />
      <AddCustomField
        formTitle="bankInformation"
        customEmployeeInformationForm={currentBankForm}
        className="mt-4"
      />
    </div>
  );
};

export default BankInformationForm;
