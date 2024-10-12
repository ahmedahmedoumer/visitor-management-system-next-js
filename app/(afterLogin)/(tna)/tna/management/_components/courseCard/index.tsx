import React, { FC, useEffect } from 'react';
import { Course } from '@/types/tna/course';
import { Card, Spin } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ActionButton from '@/components/common/actionButton';
import { classNames } from '@/utils/classNames';
import { FaRegFile } from 'react-icons/fa6';
import { useTnaManagementStore } from '@/store/uistate/features/tna/management';
import { useDeleteCourseManagement } from '@/store/server/features/tna/management/mutation';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  item: Course;
  refetch: any;
  className?: string;
}

const CourseCard: FC<CourseCardProps> = ({ item, refetch, className = '' }) => {
  const router = useRouter();
  const { setIsShowCourseSidebar, setCourseId } = useTnaManagementStore();
  const {
    mutate: deleteCourse,
    isLoading,
    isSuccess,
  } = useDeleteCourseManagement();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <Spin spinning={isLoading}>
      <Card
        hoverable
        className={classNames('relative', { 'opacity-70': item.isDraft }, [
          className,
        ])}
        cover={
          <img
            alt="example"
            src={item.thumbnail ?? ''}
            className="w-full h-[250px] object-cover object-top"
          />
        }
        onClick={() => {
          router.push(`/tna/management/${item.id}`);
        }}
      >
        <div className="absolute top-5 left-5 z-10 py-2 px-3 rounded-lg bg-primary text-white text-sm font-semibold">
          {item.isDraft ? (
            <div className="flex items-center gap-2">
              Draft <FaRegFile size={16} />
            </div>
          ) : (
            item.courseCategory.title
          )}
        </div>
        <Meta
          title={
            <div className="flex items-center gap-1">
              <div className="text-lg font-bold text-gray-900 flex-1 text-pretty">
                {item.title}
              </div>
              <ActionButton
                onEdit={(e: MouseEvent) => {
                  e.stopPropagation();
                  setCourseId(item.id);
                  setIsShowCourseSidebar(true);
                }}
                onDelete={(e: MouseEvent) => {
                  e.stopPropagation();
                  deleteCourse([item.id]);
                }}
              />
            </div>
          }
          description={
            <div className="text-base text-gray-600">{item.overview}</div>
          }
        />
      </Card>
    </Spin>
  );
};

export default CourseCard;
