'use client';

import DeleteModal from '@/components/common/deleteConfirmationModal';
import { OkrRule } from '@/store/uistate/features/okrplanning/monitoring-evaluation/okr-rule/interface';
import { Button, List } from 'antd';
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useOkrRuleStore } from '@/store/uistate/features/okrplanning/monitoring-evaluation/okr-rule';
import { useDeleteOkrRule } from '@/store/server/features/okrplanning/monitoring-evaluation/okr-rule/mutations';
import { useGetOkrRule } from '@/store/server/features/okrplanning/monitoring-evaluation/okr-rule/queries';
import OkrRuleDrawer from './okr-rule';

const DefineOkrRule = () => {
  const {
    open,
    setOpen,
    openDeleteModal,
    setOpenDeleteModal,
    deletedId,
    setDeletedId,
    okrRule,
    setOkrRule,
  } = useOkrRuleStore();

  const { mutate: deleteOkrRule } = useDeleteOkrRule();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setDeletedId(id);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleEditModal = (value: OkrRule) => {
    setOkrRule(value);
    setOpen(true);
  };
  function handleDeleteOkrRule(id: string) {
    deleteOkrRule(id, {
      onSuccess: () => {
        onCloseDeleteModal();
      },
    });
  }
  const { data: OkrRules, isLoading } = useGetOkrRule();
  return (
    <div className="p-6   w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">OKR Rule</h2>
        <Button
          type="primary"
          className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600"
          onClick={showDrawer}
        >
          + Add Rule
        </Button>
      </div>

      <List
        dataSource={OkrRules?.items}
        loading={isLoading}
        bordered={false}
        renderItem={(item) => (
          <List.Item className="flex justify-between items-center py-4 px-4 rounded-xl my-3 border border-gray-300 ">
            <span className="">{item?.title || 'Unknown title'}</span>
            <div>
              <Button
                icon={<EditOutlined />}
                className="mr-2 bg-blue text-white"
                shape="circle"
                onClick={() => handleEditModal(item)}
              />
              <Button
                icon={<DeleteOutlined />}
                className="mr-2 bg-red-500 text-white"
                shape="circle"
                onClick={() => showDeleteModal(item?.id as string)}
              />
            </div>
          </List.Item>
        )}
      />
      <OkrRuleDrawer okrRule={okrRule} open={open} onClose={onClose} />
      <DeleteModal
        open={openDeleteModal}
        onConfirm={() => handleDeleteOkrRule(deletedId)}
        onCancel={onCloseDeleteModal}
      />
    </div>
  );
};

export default DefineOkrRule;
