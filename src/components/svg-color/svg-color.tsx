import { forwardRef } from 'react';

import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------
export type SvgColorProps = {
  src: string;
  sx: SxProps<Theme>;
};

const SvgColor = forwardRef(({ src, sx, ...other }: SvgColorProps, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
