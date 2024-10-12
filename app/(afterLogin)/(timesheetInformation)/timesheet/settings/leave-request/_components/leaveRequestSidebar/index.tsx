import CustomDrawerLayout from '@/components/common/customDrawer';
import { Col, Divider, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import CustomDrawerFooterButton, {
  CustomDrawerFooterButtonProps,
} from '@/components/common/customDrawer/customDrawerFooterButton';
import CustomDrawerHeader from '@/components/common/customDrawer/customDrawerHeader';
import ApprovalStatusesInfo from '@/components/common/approvalStatuses/approvalStatusesInfo';
import ApprovalStatusCard, {
  ApprovalStatusCardProps,
} from '@/components/common/approvalStatuses/approvalStatusCard';
import { useTimesheetSettingsStore } from '@/store/uistate/features/timesheet/settings';
import UserCard from '@/components/common/userCard/userCard';
import { useGetLeaveRequest } from '@/store/server/features/timesheet/leaveRequest/queries';
import { LeaveRequest, LeaveRequestStatus } from '@/types/timesheet/settings';
import { useSetStatusToLeaveRequest } from '@/store/server/features/timesheet/leaveRequest/mutation';
import { classNames } from '@/utils/classNames';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/utils/constants';

const LeaveRequestManagementSidebar = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest>();
  const {
    isShowLeaveRequestSidebar: isShow,
    setIsShowLeaveRequestSidebar: setIsShow,
    leaveRequestId,
    setLeaveRequestId,
  } = useTimesheetSettingsStore();
  const {
    mutate: changeStatus,
    isLoading: isLoadingUpdate,
    isSuccess,
  } = useSetStatusToLeaveRequest();

  const {
    data: requestData,
    isFetching,
    refetch,
  } = useGetLeaveRequest(
    {
      page: '1',
      limit: '1',
    },
    {
      filter: {
        leaveRequestsIds: [leaveRequestId ?? ''],
      },
    },
    false,
    false,
  );

  useEffect(() => {
    if (leaveRequestId) {
      refetch();
    }
  }, [leaveRequestId]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    const item = requestData?.items?.length ? requestData?.items[0] : undefined;
    setLeaveRequest(item);
  }, [requestData]);

  const onClose = (isEdit: boolean = false, isApprove: boolean = false) => {
    if (isEdit && leaveRequestId) {
      changeStatus({
        leaveRequestId: leaveRequestId,
        status: isApprove
          ? LeaveRequestStatus.APPROVED
          : LeaveRequestStatus.DECLINED,
      });
    } else {
      setLeaveRequestId(null);
      setIsShow(false);
    }
  };

  const footerModalItems: CustomDrawerFooterButtonProps[] = [
    {
      label: 'Reject',
      key: 'reject',
      className: 'h-[56px] text-base',
      danger: true,
      size: 'large',
      type: 'primary',
      loading: isLoadingUpdate,
      onClick: () => {
        onClose(true);
      },
    },
    {
      label: 'Approve',
      key: 'approve',
      className: 'h-[56px] text-base bg-success',
      size: 'large',
      type: 'primary',
      loading: isLoadingUpdate,
      onClick: () => {
        onClose(true, true);
      },
    },
  ];

  const labelClass = 'text-sm text-gray-900 font-medium mb-2.5';

  const approvalCards: ApprovalStatusCardProps[] = [
    {
      employee: {
        name: 'Abeselom G/Gidan',
        description: 'Saas Teamlead',
      },
      status: '/icons/status/verify.svg',
    },
    {
      employee: {
        name: 'Dawit Amanauel',
        description: 'Operation Teamlead',
      },
      status: '/icons/status/reject.svg',
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  return (
    isShow && (
      <CustomDrawerLayout
        open={isShow}
        onClose={() => onClose()}
        modalHeader={<CustomDrawerHeader>Leave Requests</CustomDrawerHeader>}
        footer={<CustomDrawerFooterButton buttons={footerModalItems} />}
        width="400px"
      >
        {!leaveRequest ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : (
          <Spin spinning={isFetching || isLoadingUpdate}>
            <div className="flex items-center gap-[15px] mb-8">
              <div className="text-xs text-gray-900">Requester:</div>
              <UserCard name="Name" size="small" />
            </div>

            <Row gutter={[24, 24]}>
              <Col span={24}>
                <div className={labelClass}>
                  Leave Type <span className="text-error">*</span>
                </div>
                <div
                  className={classNames(labelClass, undefined, [
                    'font-semibold',
                    'mb-0',
                  ])}
                >
                  {leaveRequest.leaveType
                    ? typeof leaveRequest.leaveType !== 'string'
                      ? leaveRequest.leaveType.title
                      : ''
                    : ''}
                </div>
              </Col>
              <Col span={24}>
                <div className={labelClass}>
                  Date <span className="text-error">*</span>
                </div>
                <div
                  className={classNames(labelClass, undefined, [
                    'font-semibold',
                    'mb-0',
                  ])}
                >
                  {dayjs(leaveRequest.startAt).format(DATE_FORMAT)} - &nbsp;
                  {dayjs(leaveRequest.endAt).format(DATE_FORMAT)}
                </div>
              </Col>
              {leaveRequest.justificationDocument && (
                <Col span={24}>
                  <div className={labelClass}>
                    Attachment <span className="text-error">*</span>
                  </div>
                  <button className="w-full h-[54px] border border-gray-200 rounded-[10px] flex items-center justify-between px-5">
                    <div className="text-sm font-medium text-gray-900">
                      Sick_Leave.pdf
                    </div>

                    <TbFileDownload size={20} />
                  </button>
                </Col>
              )}
              <Col span={24}>
                <div className={labelClass}>
                  Note <span className="text-error">*</span>
                </div>
                <div className="border border-gray-200 rounded-[10px] px-5 py-4 text-xs text-gray-900">
                  {leaveRequest.justificationNote}
                </div>
              </Col>
            </Row>

            <Divider className="my-8 h-[5px] bg-gray-200" />

            <div>
              <div className="text-lg font-semibold text-gray-900">
                Approval Levels Status
              </div>

              <div className="my-2.5">
                <ApprovalStatusesInfo />
              </div>

              {approvalCards.map((approvalCard, idx) => (
                <ApprovalStatusCard key={idx} {...approvalCard} />
              ))}
            </div>
          </Spin>
        )}
      </CustomDrawerLayout>
    )
  );
};

export default LeaveRequestManagementSidebar;
