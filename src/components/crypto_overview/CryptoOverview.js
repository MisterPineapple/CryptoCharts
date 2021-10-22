//import {Line} from 'react-chartjs-2';
import { Button, Row, Card, Col} from 'antd';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

function CryptoOverview () {
  const [chartdata, setchartdata] = useState();
  console.log("🚀 ~ file: CryptoOverview.js ~ line 23 ~ CryptoOverview ~ chartdata", chartdata)
  useEffect(() => {
    fetch(
      'https://api-osmosis.imperator.co/liquidity/v1/historical/chart'
    ).then(response => {
      return response.json();
    }).then(data => {
      setchartdata(data)
    })
  }, [])

  const config = {
    data: chartdata,
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
            {chartdata && <Line {...config} /> }
         
          </Card>
        </Col>
        <Col span={12} >
          <Card bodyStyle={{backgroundColor: 'white'}}>
          {chartdata && <Line {...config} /> }

        </Card>
        </Col>
      </Row>
    </div>
    );
}

export default CryptoOverview;


// export default class App extends React.Component {
//     render() {
//       return (
//         <div>
//           <Line
//             data={state}
//             options={{
//               title:{
//                 display:true,
//                 text:'Average Rainfall per month',
//                 fontSize:20
//               },
//               legend:{
//                 display:true,
//                 position:'right'
//               }
//             }}
//           />
//         </div>
//       );
//     }
//   }