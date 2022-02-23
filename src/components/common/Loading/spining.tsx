import React, { memo } from 'react';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { LoadingSprintBg } from './styled';

export interface LoadingSpinWrapProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingSpintWrap: React.FC<LoadingSpinWrapProps> = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (props.isLoading) {
    return (
      <LoadingSprintBg>
        <Spin indicator={antIcon} />
      </LoadingSprintBg>
    );
  }
  return <>{props.children}</>;
};

export default LoadingSpintWrap;
