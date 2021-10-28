import { Row, Card, Col} from 'antd';
import { Area, Column } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import classes from './CryptoOverview.module.css'

function CryptoOverview () {
  const [liquiditydata, setliquiditydata] = useState();
  const [volumedata, setvolumedata] = useState();
  const [totaliquiditydata, settotalliquiditydata] = useState();
  const [totalvolumedata, settotalvolumedata] = useState();

  const myCurrentDate = new Date()
  const date = myCurrentDate.getDate();
  const month = myCurrentDate.getMonth();
  const year = myCurrentDate.getFullYear();

  var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  var nf = new Intl.NumberFormat();

  const PlotMaps = {};
  let PreTooltipData;

  useEffect(() => {
    fetch(
      'https://api-osmosis.imperator.co/liquidity/v1/historical/chart'
    ).then(response => {
      return response.json();
    }).then(data => {
      setliquiditydata(data);
    })
  }, [])

  useEffect(() => {
    fetch(
      'https://api-osmosis.imperator.co/volume/v1/historical/chart'
    ).then(response => {
      return response.json();
    }).then(data => {
      setvolumedata(data);
    })
  }, [])

  useEffect(() => {
    fetch(
      'https://api-osmosis.imperator.co/liquidity/v1/actual'
    ).then(response => {
      return response.json();
    }).then(data => {
      settotalliquiditydata(data.value);
    })
  }, [])

  useEffect(() => {
    fetch(
      'https://api-osmosis.imperator.co/volume/v1/actual'
    ).then(response => {
      return response.json();
    }).then(data => {
      settotalvolumedata(data.value);
    })
  }, [])

  const configVolume = {
     data: volumedata,
     xField: 'time',
     yField: 'value',
     color: '#fbc02c',
     yAxis: {
      position: 'right',
      label: {
        formatter: (value) => {
          return (value / 1000000) + '.' + ((value / 100000) % 10) + 'M';
        },
      },
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
    },
    xAxis: {
      label: {
        formatter: (date) => {
          var arr = date.split('-');
          var selectedMonthName = months[(arr[1]-1) % 12];
          return selectedMonthName + '/' + (arr[0] % 100);
        },
      },
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
    },
  };
  
  const configLiquidity = {
    data: liquiditydata,
    xField: 'time',
    yField: 'value',
    yAxis: {
      position: 'right',
      label: {
        formatter: (value) => {
          return (value / 1000000) + '.' + ((value / 100000) % 10) + 'M';
        },
      },
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
    },
    xAxis: {
      label: {
        formatter: (date) => {
          var arr = date.split('-');
          var selectedMonthName = (months[(arr[1]-1) % 12]+1);
          return selectedMonthName + '/' + (arr[0] % 100);
        },
      },
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
    },
    color: '#fbc02c',
    areaStyle: {
      fill: 'l(270) 0:#2f2955 0.5:#594b5c 1:#fbc02c',
      lineWidth: 0,
    },
  };
 
    return (
    <div className={classes.cryptoOverviewLayout}>
      <Row>
      <p className={classes.headerRow}>Osmosis - Overview</p>
      </Row>
      <Row gutter={20}>
        <Col span={12} >
          <Card className={classes.card}>
            <div className={classes.cardText}>Liquidity</div>
            <div className={classes.cardTextAmount}>${nf.format(totaliquiditydata)}</div>
            <div className={classes.cardTextDate}>{months[month]} {date},{year}</div>

            {liquiditydata && <Area {...configLiquidity} /> }
          </Card>
        </Col>
        <Col span={12} >
          <Card className={classes.card}>
            <div className={classes.cardText}>Volume</div>
            <div className={classes.cardTextAmount}>${nf.format(totalvolumedata)}</div>
            <div className={classes.cardTextDate}>{months[month]} {date},{year}</div>
            
            {volumedata && <Column {...configVolume} /> }

        </Card>
        </Col>
      </Row>
    </div>
    );
}

export default CryptoOverview;
