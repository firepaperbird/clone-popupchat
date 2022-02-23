import React, { useMemo } from 'react';
import { DropdownItemWrapper } from './styled';
import { CustomDropdownItemProps } from '../../../types';
import { color } from '../../../enum/theme';

const CustomDropdownItem: React.FC<CustomDropdownItemProps> = (props) => {
  const { onClick, children, className } = props;
  const pcolor = useMemo(() => [color.primary, color.getTextColor()], [color.primary]);
  return (
    <DropdownItemWrapper pcolor={pcolor[0]} textColor={pcolor[1]} className={className} onClick={onClick}>
      {children}
    </DropdownItemWrapper>
  );
};

export default CustomDropdownItem;
