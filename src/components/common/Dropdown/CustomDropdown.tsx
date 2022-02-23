import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import CustomDropdownItem from './CustomDropdownItem';
import { CustomDropdownProps } from '../../../types';

import { DropdownWrapper, CustomDropdownContainer } from './styled';

const CustomDropdown: React.FC<CustomDropdownProps> = (props) => {
  const { title, children } = props;
  const divRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const handleToggleDropdown = useCallback(() => setActive((prevActive) => !prevActive), []);
  const handleClickOutside = useCallback((event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  return (
    <DropdownWrapper ref={divRef}>
      <CustomDropdownContainer active={active}>{active && children}</CustomDropdownContainer>
      <CustomDropdownItem onClick={handleToggleDropdown}>
        {title}
        {active ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </CustomDropdownItem>
    </DropdownWrapper>
  );
};

export default CustomDropdown;
