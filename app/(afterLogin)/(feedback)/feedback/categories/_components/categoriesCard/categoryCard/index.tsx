import React from 'react';
import { Card, Typography, Dropdown } from 'antd';
import { FaEllipsisVertical, FaCircle } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { useGetUsersById } from '@/store/server/features/feedback/category/queries';
import Avatar from '@/public/gender_neutral_avatar.jpg';
import { CategoriesManagementStore } from '@/store/uistate/features/feedback/categories';

const { Title, Paragraph } = Typography;

interface CategoryCardProps {
  category: any;
  onMenuClick: (key: string, category: any) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onMenuClick,
}) => {
  const { data: userData } = useGetUsersById();

  const { rows } = CategoriesManagementStore();

  return (
    <Card
      hoverable
      className="w-[280px] relative bg-gray-100 h-min-screen flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-2">
        <Link href={`/feedback/categories/${category?.id}`}>
          <Title level={4} className="m-0">
            {category?.name}
          </Title>
        </Link>
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: 'Edit',
                onClick: () => onMenuClick('edit', category),
              },
              {
                key: 'delete',
                label: 'Delete',
                onClick: () => onMenuClick('delete', category),
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <FaEllipsisVertical className="text-lg text-gray-400 cursor-pointer" />
        </Dropdown>
      </div>
      <Link href={`/feedback/categories/${category?.id}`}>
        <Paragraph ellipsis={{ rows }} className="text-gray-600 h-[50px]">
          {category?.description}
        </Paragraph>
        <div className="flex items-center mt-4">
          <Image
            src={userData?.profileImage ?? Avatar}
            alt="Profile pic"
            width={30}
            height={50}
            className="rounded-full object-fit"
          />
          <div className="ml-2 flex flex-col">
            <div className="flex flex-wrap md:gap-0 items-center justify-between gap-4 ">
              <div>
                <Typography.Text strong>
                  {(userData?.firstName ?? 'Unknown') +
                    ' ' +
                    (userData?.middleName ?? '-')}
                </Typography.Text>
              </div>
              <div className="flex justify-center items-center gap-1">
                <FaCircle size={8} color="#3636f0" />
                <Typography.Text className="text-xs font-normal text-gray-400">
                  Creator
                </Typography.Text>
              </div>
            </div>
            <Typography.Text type="secondary">
              <span className="capitalize">{userData?.role?.name}</span>
            </Typography.Text>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CategoryCard;
