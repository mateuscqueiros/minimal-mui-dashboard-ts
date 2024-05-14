import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from '../../utils/format-number';

import Chart, { useChart } from '../../components/chart';
import { AppWidgetProps } from './view/app-view';

// ----------------------------------------------------------------------

export default function AppConversionRates({ title, subheader, chart, ...other }: AppWidgetProps) {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i: any) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: any) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i: any) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions as any}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppConversionRates.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
