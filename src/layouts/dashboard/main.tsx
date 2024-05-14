import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from '../../hooks/use-responsive';

import { SxProps, Theme } from '@mui/material';
import { HEADER, NAV } from './config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export type MainProps = {
  sx?: SxProps<Theme>;
  [x: string]: any;
} & React.PropsWithChildren;

export default function Main({ children, sx, ...other }: MainProps) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
