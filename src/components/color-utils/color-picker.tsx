import { forwardRef, useCallback } from 'react';

import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { SxProps, Theme, alpha } from '@mui/material/styles';

import Iconify from '../iconify';

// ----------------------------------------------------------------------
export type ColorPickerProps = {
  colors: string | string[];
  limit: number | 'auto';
  onSelectColor: (value?: any) => void;
  selected: string | string[];
  sx?: SxProps<Theme>;
  [key: string]: any;
};

const ColorPicker = forwardRef(
  ({ colors, selected, onSelectColor, limit = 'auto', sx, ...other }: ColorPickerProps, ref) => {
    const singleSelect = typeof selected === 'string';

    const handleSelect = useCallback(
      (color: any) => {
        if (singleSelect) {
          if (color !== selected) {
            onSelectColor(color);
          }
        } else {
          const newSelected = selected.includes(color)
            ? selected.filter((value) => value !== color)
            : [...selected, color];

          onSelectColor(newSelected);
        }
      },
      [onSelectColor, selected, singleSelect]
    );

    return (
      <Stack
        ref={ref}
        direction="row"
        display="inline-flex"
        sx={{
          flexWrap: 'wrap',
          ...(limit !== 'auto' && {
            width: limit * 36,
            justifyContent: 'flex-end',
          }),
          ...sx,
        }}
        {...other}
      >
        {Array.isArray(colors) &&
          colors.map((color: string) => {
            const hasSelected = singleSelect ? selected === color : selected.includes(color);

            return (
              <ButtonBase
                key={color}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                }}
                onClick={() => {
                  handleSelect(color);
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color,
                    borderRadius: '50%',
                    border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                    ...(hasSelected && {
                      transform: 'scale(1.3)',
                      boxShadow: `4px 4px 8px 0 ${alpha(color, 0.48)}`,
                      outline: `solid 2px ${alpha(color, 0.08)}`,
                      transition: (theme) =>
                        theme.transitions.create('all', {
                          duration: theme.transitions.duration.shortest,
                        }),
                    }),
                  }}
                >
                  <Iconify
                    width={hasSelected ? 12 : 0}
                    icon="eva:checkmark-fill"
                    sx={{
                      color: (theme: Theme) => theme.palette.getContrastText(color),
                      transition: (theme: Theme) =>
                        theme.transitions.create('all', {
                          duration: theme.transitions.duration.shortest,
                        }),
                    }}
                  />
                </Stack>
              </ButtonBase>
            );
          })}
      </Stack>
    );
  }
);

export default ColorPicker;
