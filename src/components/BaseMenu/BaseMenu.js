import React from 'react';
import {Divider, Menu} from 'react-native-paper';

const BaseMenu = props => {
  const {menuProps, options, showDivider, dividerProps, optionsAfterDivider} =
    props;

  return (
    <Menu {...menuProps}>
      {options?.map(option => (
        <Menu.Item {...option} />
      ))}
      {showDivider && <Divider {...dividerProps} />}
      {optionsAfterDivider?.map(option => (
        <Menu.Item {...option} />
      ))}
    </Menu>
  );
};

export default BaseMenu;
