'use client';

import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CHART_THEMES } from '@/constants/cardano';
import { BaseMetric } from '@/types/cardano';

interface ChartProps {
  data: BaseMetric[];
  title?: string;
  yAxisTitle?: string;
  type?: 'line' | 'area' | 'column' | 'spline';
  color?: string;
  height?: number;
  className?: string;
  formatTooltip?: (point: any) => string;
  formatYAxis?: (value: number) => string;
}

export const Chart = ({
  data,
  title,
  yAxisTitle,
  type = 'area',
  color = '#0033AD',
  height = 300,
  className = '',
  formatTooltip,
  formatYAxis,
}: ChartProps) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const defaultFormatValue = (value: number): string => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toLocaleString();
  };

  const chartOptions: Highcharts.Options = {
    chart: {
      type,
      backgroundColor: CHART_THEMES.backgroundColor,
      height,
      spacing: [10, 10, 15, 10],
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: title || '',
      style: {
        color: CHART_THEMES.textColor,
        fontSize: '14px',
        fontWeight: '600',
      },
    },
    xAxis: {
      type: 'datetime',
      gridLineColor: CHART_THEMES.gridColor,
      lineColor: CHART_THEMES.gridColor,
      tickColor: CHART_THEMES.gridColor,
      labels: {
        style: {
          color: CHART_THEMES.textColor,
          fontSize: '11px',
        },
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle || '',
        style: {
          color: CHART_THEMES.textColor,
          fontSize: '12px',
        },
      },
      gridLineColor: CHART_THEMES.gridColor,
      labels: {
        style: {
          color: CHART_THEMES.textColor,
          fontSize: '11px',
        },
        formatter: function () {
          return formatYAxis ? formatYAxis(this.value as number) : defaultFormatValue(this.value as number);
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: '#1F2937',
      borderColor: '#374151',
      borderRadius: 8,
      shadow: false,
      style: {
        color: '#E5E7EB',
        fontSize: '12px',
      },
      formatter: function () {
        if (formatTooltip) {
          return formatTooltip(this);
        }
        const date = new Date(this.x as number).toLocaleDateString();
        const value = defaultFormatValue(this.y as number);
        return `<b>${date}</b><br/>${this.series.name}: <b>${value}</b>`;
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, `${color}40`],
            [1, `${color}10`],
          ] as any,
        },
        lineWidth: 2,
        lineColor: color,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 5,
            },
          },
        },
      },
      line: {
        lineWidth: 2,
        color: color,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 5,
            },
          },
        },
      },
      spline: {
        lineWidth: 2,
        color: color,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 5,
            },
          },
        },
      },
      column: {
        color: color,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: yAxisTitle || 'Value',
        data: data.map(item => [item.timestamp, item.value]),
        type: type as any,
      },
    ],
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  };

  return (
    <div className={className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    </div>
  );
};