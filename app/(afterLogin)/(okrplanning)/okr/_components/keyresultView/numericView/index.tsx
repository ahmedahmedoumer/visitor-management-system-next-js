import React from 'react';
import { Button, Input, DatePicker, Form, InputNumber, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { VscClose } from 'react-icons/vsc';
import { OKRProps } from '@/store/uistate/features/okrplanning/okr/interface';
import { useOKRStore } from '@/store/uistate/features/okrplanning/okr';
import { useDeleteKeyResult } from '@/store/server/features/okrplanning/okr/objective/mutations';

const NumericView: React.FC<OKRProps> = ({ keyValue, index, isEdit }) => {
  const {
    handleKeyResultChange,
    handleSingleKeyResultChange,
    removeKeyResultValue,
  } = useOKRStore();
  const handleChange = (value: any, field: string) => {
    if (isEdit) {
      handleSingleKeyResultChange(value, field);
    } else {
      handleKeyResultChange(value, index, field);
    }
  };
  const { mutate: deleteKeyResult } = useDeleteKeyResult();
  function handleKeyResultDelete(id: string) {
    deleteKeyResult(id, {
      onSuccess: () => {
        removeKeyResultValue(index);
      },
    });
  }
  return (
    <div className="py-4  border-b-[1px] border-gray-300">
      <Form layout="vertical" className="space-y-1">
        {/* Key Result Input */}
        <div className="flex gap-3 items-center">
          <div className="rounded-lg border-gray-200 border bg-gray-300 w-10 h-8 flex justify-center items-center mt-2">
            {index + 1}
          </div>
          <Form.Item
            label={
              (keyValue.key_type == 'Numeric' && 'Numeric') ||
              keyValue.metricType?.name
            }
            className="w-full font-bold "
          >
            <Input
              value={keyValue.title}
              onChange={(e) => {
                handleChange(e.target.value, 'title');
              }}
            />
          </Form.Item>
          <Form.Item className="w-24 font-bold" label="Weight">
            <InputNumber
              min={0}
              max={100}
              suffix="%"
              value={keyValue.weight}
              onChange={(value) => {
                handleChange(value, 'weight');
              }}
            />
          </Form.Item>
          <div className="flex gap-2 mt-2">
            <Tooltip color="gray" title="Remove Key Result">
              <Button
                className="rounded-full w-5 h-5"
                icon={<VscClose size={20} />}
                type="primary"
                onClick={() =>
                  keyValue?.id
                    ? handleKeyResultDelete(keyValue?.id)
                    : removeKeyResultValue(index)
                } // Hook up the remove key result function
              />
            </Tooltip>
          </div>
        </div>

        <div className="flex gap-5 w-full">
          <Form.Item
            layout="horizontal"
            className="font-semibold text-xs w-full mb-2"
            id="initialValue"
            label="Initial"
            rules={[
              {
                required: true,
                message: 'Please select a initialValue',
              },
            ]}
          >
            <InputNumber
              min={0}
              className="w-full text-xs"
              value={keyValue.initialValue}
              onChange={(value) => {
                handleChange(value, 'initialValue');
              }}
            />
          </Form.Item>

          {/* Weight */}
          <Form.Item
            layout="horizontal"
            className="font-semibold text-xs w-full mb-2"
            id="targetValue"
            label="Target"
            rules={[
              {
                required: true,
                message: 'Please select a initialValue',
              },
            ]}
          >
            <InputNumber
              className="text-xs w-full"
              value={keyValue.targetValue}
              onChange={(value) => {
                handleChange(value, 'targetValue');
              }}
            />
          </Form.Item>
          <Form.Item
            layout="horizontal"
            className="w-full font-bold"
            label="Deadline"
          >
            <DatePicker
              value={keyValue.deadline ? dayjs(keyValue.deadline) : null}
              onChange={(dateString) => {
                handleChange(dateString, 'deadline');
              }}
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                return current && current < dayjs().startOf('day');
              }}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default NumericView;
