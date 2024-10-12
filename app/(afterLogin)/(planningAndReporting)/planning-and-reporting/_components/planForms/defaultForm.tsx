import { Col, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import SubTaskComponent from './createSubtaskForm';
import { MdCancel } from 'react-icons/md';
import { PlanningAndReportingStore } from '@/store/uistate/features/planningAndReporting/useStore';

interface DefaultCardInterface {
  kId: string;
  hasTargetValue: boolean;
  hasMilestone: boolean;
  milestoneId: string | null;
  name: string;
  form: any;
  planningPeriodId: string;
  userId: string;
  planningUserId: string;
}

function DefaultCardForm({
  kId,
  hasTargetValue,
  milestoneId,
  name,
  form,
  userId,
  planningPeriodId,
  planningUserId,
}: DefaultCardInterface) {
  const { setWeight } = PlanningAndReportingStore();

  return (
    <Form.List name={name}>
      {(fields, { remove }, { errors }) => (
        <>
          {fields.map((field) => (
            <Form.Item required={false} key={field.key}>
              <Form.Item
                {...field}
                name={[field.name, 'milestoneId']}
                initialValue={milestoneId || null}
                noStyle
                key={`${field.key}-milestoneId`} // Unique key for milestoneId
              >
                <Input type="hidden" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'keyResultId']}
                initialValue={kId || null}
                noStyle
                key={`${field.key}-keyResultId`} // Unique key for keyResultId
              >
                <Input type="hidden" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'planningPeriodId']}
                initialValue={planningPeriodId}
                noStyle
                key={`${field.key}-planningPeriodId`} // Unique key for planningPeriodId
              >
                <Input type="hidden" value={planningPeriodId} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'planningUserId']}
                initialValue={planningUserId}
                noStyle
                key={`${field.key}-planningUserId`} // Unique key for planningUserId
              >
                <Input type="hidden" value={planningUserId} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'userId']}
                initialValue={userId}
                noStyle
                key={`${field.key}-userId`} // Unique key for userId
              >
                <Input type="hidden" value={userId} />
              </Form.Item>

              <Row gutter={8}>
                <Col lg={12} sm={24}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'task']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          'Please input a task name or delete this field.',
                      },
                    ]}
                    label={'Task'}
                    key={`${field.key}-task`} // Unique key for task
                  >
                    <Input placeholder="Task name" />
                  </Form.Item>
                </Col>
                <Col lg={12} sm={24}>
                  <Space>
                    <Form.Item
                      {...field}
                      name={[field.name, 'priority']}
                      label={'Priority'}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          message: 'Please select a priority',
                        },
                      ]}
                      key={`${field.key}-priority`} // Unique key for priority
                    >
                      <Select
                        className="w-24"
                        options={[
                          {
                            label: 'High',
                            value: 'high',
                            className: 'text-error',
                          },
                          {
                            label: 'Medium',
                            value: 'medium',
                            className: 'text-warning',
                          },
                          {
                            label: 'Low',
                            value: 'low',
                            className: 'text-success',
                          },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label={'Weight'}
                      name={[field.name, 'weight']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          message: 'Please input a number',
                        },
                      ]}
                      key={`${field.key}-weight`} // Unique key for weight
                    >
                      <InputNumber
                        placeholder="0"
                        onChange={() => {
                          const fieldValue = form.getFieldValue(name) || [];
                          const totalWeight = fieldValue.reduce(
                            (sum: number, field: any) =>
                              sum + (field.weight || 0),
                            0,
                          );
                          setWeight(name, totalWeight);
                        }}
                        min={0}
                        max={100}
                      />
                    </Form.Item>

                    <MdCancel
                      className="text-primary cursor-pointer"
                      size={20}
                      onClick={() => {
                        remove(field.name);
                        const fieldValue = form.getFieldValue(name) || [];
                        const totalWeight = fieldValue.reduce(
                          (sum: number, field: any) =>
                            sum + (field.weight || 0),
                          0,
                        );
                        setWeight(name, totalWeight);
                      }}
                    />
                  </Space>
                </Col>
              </Row>

              <Form.Item
                className="my-4"
                label={'Target Amount'}
                {...field}
                name={[field.name, 'targetValue']}
                hidden={hasTargetValue}
                key={`${field.key}-targetValue`} // Unique key for targetValue
              >
                <InputNumber
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
              </Form.Item>
              <Form.Item label="Sub tasks" className="mx-8">
                <SubTaskComponent
                  field={field}
                  kId={kId}
                  hasTargetValue={hasTargetValue}
                  milestoneId={milestoneId}
                  planningPeriodId={planningPeriodId}
                  planningUserId={planningUserId}
                  userId={userId}
                />
              </Form.Item>
            </Form.Item>
          ))}

          <Form.Item>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default DefaultCardForm;
