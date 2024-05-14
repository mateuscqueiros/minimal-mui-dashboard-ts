import { Icon, IconifyIcon } from '@iconify/react';
import { forwardRef } from 'react';

import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type IconifyProps = {
  icon: IconifyIcon | string;
  sx?: SxProps<Theme>;
  width?: number;
  [key: string]: any;
};

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
