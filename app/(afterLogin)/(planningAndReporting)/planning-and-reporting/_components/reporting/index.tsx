import CustomButton from '@/components/common/buttons/customButton';
import EmployeeSearch from '@/components/common/search/employeeSearch';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';
import KeyResultMetrics from '../keyResult';
import {
  AllPlanningPeriods,
  useGetReporting,
} from '@/store/server/features/okrPlanningAndReporting/queries';
import { useGetAllUsers } from '@/store/server/features/employees/employeeManagment/queries';
import { useGetDepartmentsWithUsers } from '@/store/server/features/employees/employeeManagment/department/queries';
import dayjs from 'dayjs';
import { groupTasksByKeyResultAndMilestone } from '../dataTransformer/report';
import { EmptyImage } from '@/components/emptyIndicator';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { PlanningAndReportingStore } from '@/store/uistate/features/planningAndReporting/useStore';
import { ReportingType } from '@/types/enumTypes';
import TasksDisplayer from './milestone';

const { Title } = Typography;

function Reporting() {
  const { setOpenReportModal, selectedUser, activePlanPeriod } =
    PlanningAndReportingStore();
  const { data: employeeData } = useGetAllUsers();
  const { userId } = useAuthenticationStore();
  const { data: departmentData } = useGetDepartmentsWithUsers();
  const { data: planningPeriods } = AllPlanningPeriods();
  const planningPeriodId =
    planningPeriods?.[activePlanPeriod - 1]?.planningPeriod?.id;

  const { data: allReporting } = useGetReporting({
    userId: selectedUser,
    planPeriodId: planningPeriodId,
  });

  const activeTabName =
    planningPeriods?.[activePlanPeriod - 1]?.planningPeriod?.name;
  const getEmployeeData = (id: string) => {
    const employeeDataDetail = employeeData?.items?.find(
      (emp: any) => emp?.id === id,
    );

    return employeeDataDetail || {}; // Return an empty object if employeeDataDetail is undefined
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center my-4 gap-4">
        <Title level={5}>Planning</Title>
        {selectedUser.includes(userId) &&
          ((allReporting?.[0]?.status === 'reported' ?? false) ||
            allReporting?.length === 0) && (
            <CustomButton
              title={`Create ${activeTabName}`}
              id="createActiveTabName"
              icon={<FaPlus className="mr-2" />}
              onClick={() => setOpenReportModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            />
          )}
      </div>
      <EmployeeSearch
        optionArray1={employeeData?.items}
        optionArray2={ReportingType}
        optionArray3={departmentData}
      />
      {allReporting?.map((dataItem: any, index: number) => (
        <Card
          key={index}
          title={
            <div>
              <Row gutter={16} className="items-center">
                <Col xs={4} sm={2} md={1}>
                  <Avatar style={{ verticalAlign: 'middle' }} size="default">
                    user
                  </Avatar>
                </Col>
                <Col xs={20} sm={22} md={23}>
                  <Row className="font-bold text-lg">
                    <Row className="font-bold text-xs">
                      {getEmployeeData(dataItem?.userId)?.firstName +
                        ' ' +
                        (getEmployeeData(dataItem?.createdBy)?.middleName
                          ? getEmployeeData(dataItem?.createdBy)
                              .middleName.charAt(0)
                              .toUpperCase()
                          : '')}
                    </Row>
                  </Row>
                  <Row className="flex justify-between items-center">
                    <Row gutter={16} justify={'start'}>
                      <Col className="text-gray-500 text-xs">Status</Col>
                      <Col>
                        <Avatar
                          size={16}
                          shape="square"
                          className={`-mt-2 ${dataItem?.status ? 'bg-green-300' : 'bg-yellow-300'}`}
                          icon={<MdOutlinePending />}
                        />
                      </Col>
                      <Col className="text-xs -ml-3">
                        {dataItem?.status ? 'Closed' : 'Open'}
                      </Col>
                    </Row>
                    <Col span={10} className="flex justify-end items-center">
                      <span className="mr-4 text-gray-500">
                        {dayjs(dataItem?.createdAt).format(
                          'MMMM D YYYY, h:mm:ss A',
                        )}
                      </span>
                      <Col className="mr-2"></Col>
                      <Col></Col>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          }
        >
          {groupTasksByKeyResultAndMilestone(dataItem?.reportTask)?.map(
            (keyResult: any) => (
              <>
                <KeyResultMetrics
                  keyResult={
                    keyResult ?? {
                      id: 'defaultKeyResult',
                      name: 'No Key Result Available',
                      tasks: [],
                    }
                  }
                />
                {keyResult?.milestones?.map(
                  (milestone: any, milestoneIndex: number) => (
                    <>
                      <Col span={24} className="ml-2">
                        <strong>{`${milestoneIndex + 1}. ${milestone?.title}`}</strong>
                      </Col>
                      <TasksDisplayer tasks={milestone?.tasks} />
                    </>
                  ),
                )}
                <TasksDisplayer tasks={keyResult?.tasks} />
              </>
            ),
          )}
          ,
        </Card>
      ))}
      {allReporting?.length <= 0 && (
        <div className="flex justify-start">
          <EmptyImage />
        </div>
      )}
    </div>
  );
}
export default Reporting;
