import { Row, Card, Col} from 'antd';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

function CryptoOverview () {
  const [liquiditydata, setliquiditydata] = useState();
  const [volumedata, setvolumedata] = useState();

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

  const configLiquidity = {
    data: liquiditydata,
    height: 400,
    xField: 'time',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const configVolume = {
    data: volumedata,
    height: 400,
    xField: 'time',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };
  
 
    return (
    <div style={{marginLeft: 30, marginRight: 30}}>
      <Row>
      <p style={{color: 'white'}}>Market Overview</p>
      </Row>
      <Row  gutter={20}>
        <Col span={12} >
          <Card className='card'>
            {liquiditydata && <Line {...configLiquidity} /> }
         
          </Card>
        </Col>
        <Col span={12} >
          <Card bodyStyle={{backgroundColor: 'white'}}>
            {volumedata && <Line {...configVolume} /> }

        </Card>
        </Col>
      </Row>
    </div>
    );
}

export default CryptoOverview;
