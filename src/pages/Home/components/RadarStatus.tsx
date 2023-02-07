import React, {useState, useEffect, useRef, useMemo} from 'react';
import {GaugeConfig, Gauge} from "@ant-design/charts";
type RadarStatusProp = {
    radarStatus: number
}
const RadarStatus = (props: RadarStatusProp) => {
    const ticks = [0, 1 / 3, 2 / 3, 1];
    const color = ['#F4664A', '#FAAD14', '#30BF78'];
    const status = useMemo(() => 0.2 * 100, [props.radarStatus]);

    const config: GaugeConfig = {
        percent: props.radarStatus,
        appendPadding: 20,
        // height: 320,
        range: {
            ticks: [0, 1],
            color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            title: {
                formatter: (params) => {
                    let percent = params!.percent
                    if (percent < ticks[1]) {
                        return '离线';
                    }

                    if (percent < ticks[2]) {
                        return '启动中';
                    }

                    return '在线';
                },
                style: (params) => {
                    let percent = params!.percent
                    return {
                        fontSize: '36px',
                        lineHeight: 1,
                        color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
                    };
                },
            },
            content: {
                offsetY: 36,
                style: {
                    fontSize: '24px',
                    color: '#4B535E',
                },
                // formatter: () => status.toFixed(2) + '%',
            },
        },
    };

    return <Gauge {...config} />;
};

export default RadarStatus