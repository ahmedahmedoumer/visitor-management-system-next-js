import dayjs from 'dayjs';
import { Card, Col, Row, Table } from 'antd';
import { LuPencil } from 'react-icons/lu';
import { InfoLine } from '../common/infoLine';
import { useGetEmployee } from '@/store/server/features/employees/employeeManagment/queries';
import WorkScheduleComponent from './workSchedule';
import { useEmployeeManagementStore } from '@/store/uistate/features/employees/employeeManagment';
import { CreateEmployeeJobInformation } from './addEmployeeJobInfrmation';
import { FaPlus } from 'react-icons/fa';

function Job({ id }: { id: string }) {
  const { isLoading, data: employeeData } = useGetEmployee(id);
  const { setIsAddEmployeeJobInfoModalVisible } = useEmployeeManagementStore();
  const handleAddEmployeeJobInformation = () => {
    setIsAddEmployeeJobInfoModalVisible(true);
  };

  const columns = [
    {
      title: 'Effective Date',
      dataIndex: 'effectiveStartDate',
      key: 'effectiveStartDate',
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Employment Type',
      dataIndex: 'employementTypeId',
      key: 'employementTypeId',
      render: (ruleData: any, record: any) => (
        <>{record?.employementType?.name}</>
      ),
    },
    {
      title: 'Manager',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'address',
      render: (ruleData: any, record: any) => <>{record?.department?.name}</>,
    },
  ];
  return (
    <>
      {' '}
      <Card
        loading={isLoading}
        title="Employment Information"
        extra={<LuPencil />}
        className="my-6 mt-0"
      >
        <Row gutter={[16, 24]}>
          <Col lg={16}>
            <InfoLine
              title="Service Year"
              value={
                employeeData?.employeeInformation?.joinedDate ? (
                  <>
                    {Math.floor(
                      dayjs().diff(
                        dayjs(employeeData?.employeeInformation?.joinedDate),
                        'months',
                      ) / 12,
                    )}
                    {' Years,  '}
                    {dayjs().diff(
                      dayjs(employeeData?.employeeInformation?.joinedDate),
                      'months',
                    ) % 12}{' '}
                    Months
                  </>
                ) : (
                  '-'
                )
              }
            />
            <InfoLine
              title="Joined Date"
              value={
                dayjs(employeeData?.employeeInformation?.joinedDate)?.format(
                  'DD MMMM, YYYY',
                ) || '-'
              }
            />
          </Col>
        </Row>
      </Card>{' '}
      <Card extra={<FaPlus onClick={handleAddEmployeeJobInformation} />}>
        <Table
          dataSource={employeeData?.employeeJobInformation}
          columns={columns}
          className="w-full overflow-auto"
          pagination={{ hideOnSinglePage: true }}
        />
      </Card>
      <WorkScheduleComponent id={id} />
      <CreateEmployeeJobInformation id={id} />
    </>
  );
}

export default Job;
