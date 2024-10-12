'use client';
import { Input, Card, Switch, Dropdown, Menu, Modal } from 'antd';
import { MoreOutlined, CheckOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { useGetAllPlanningPeriods } from '@/store/server/features/employees/planning/planningPeriod/queries';
import {useDeletePlanningPeriod, useUpdatePlanningPeriod, useUpdatePlanningPeriodStatus } from '@/store/server/features/employees/planning/planningPeriod/mutation';
import { Empty } from 'antd/lib';
import { CustomizeRenderEmpty, EmptyImage } from '@/components/emptyIndicator';

const PlanningPeriod: FC = () => {
  const {data:allPlanningperiod}=useGetAllPlanningPeriods();
  const {mutate:updateStatus,isLoading}=useUpdatePlanningPeriodStatus();
  const {mutate:deletePlanningPeriod,isLoading:deletePlannniggPeriod}=useDeletePlanningPeriod();
  const {mutate:editPlanningPeriod,isLoading:editPlannningPeriod}=useUpdatePlanningPeriod();



  // const { mutate: assignUsers, isLoading } = useAssignPlanningPeriodToUsers();
  // const { data: assignedPlanningPeriodforMe } = useGetAssignedPlanningPeriodForUserId();


  // console.log(assignedPlanningPeriodforMe,"assignedPlanningPeriodforMe")

  // const isCheckedOrNot = (planningPeriodId: string) => {
  //   return assignedPlanningPeriodforMe?.some(item => item?.planningPeriodId === planningPeriodId) || false;
  // };
const handleEdit=(id:string)=>{
    
}
const handleDelete=(id:string)=>{
  Modal.confirm({
    title: 'Confirm Delete',
    content: 'Are you sure you want to delete this planning period?',
    onOk() {
      deletePlanningPeriod(id);
    },
  });
}
const menu = (planningPeriodId: string) => (
  <Menu>
    <Menu.Item key="1" disabled={editPlannningPeriod} onClick={() => handleEdit(planningPeriodId)}>Edit</Menu.Item> 
    <Menu.Item key="2"  disabled={deletePlannniggPeriod} onClick={() => handleDelete(planningPeriodId)}>Delete</Menu.Item> 
  </Menu>
);
  return (
    <div className="p-4">
      <div className="mb-4">
        <Input.Search
          placeholder="Search period by name"
          className="rounded-lg"
        />
      </div>
      {allPlanningperiod?.items?.map(planningPeriod => (
          <Card
            title={planningPeriod?.name}
            extra={
              <div className='flex'>
                <Switch
                  checked={planningPeriod?.isActive}
                  disabled={isLoading}
                  onChange={() => updateStatus(planningPeriod.id)}
                  className="mr-4"
                  checkedChildren={<CheckOutlined />}
                />
                <div>
                <Dropdown overlay={menu(planningPeriod.id)} trigger={['click']}> 
                  <MoreOutlined className="cursor-pointer" />
                </Dropdown>
                </div>
              </div>
            }
            className="mb-4"
            bodyStyle={{ padding: '0.5rem 1rem' }}
          >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Action on Failure</p>
            <p>{planningPeriod?.actionOnFailure}</p>
          </div>
          <div>
            <p className="text-gray-500">Interval</p>
            <p>{planningPeriod?.intervalType}</p>
          </div>
        </div>
      </Card>
      ))}
      {allPlanningperiod?.items.length==0&&(
        <div className='flex justify-center items-center'><CustomizeRenderEmpty /></div>
      )}
    </div>
  );
};

export default PlanningPeriod;
