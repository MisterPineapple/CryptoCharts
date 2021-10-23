import React from 'react'
import { useRouteMatch } from 'react-router'
import { useEffect, useState } from 'react'
import {Row, Col, Card} from 'antd'
import { Stock } from '@ant-design/charts';
import _ from 'lodash';

const CryptoOverviewDetail = () => {
    const match = useRouteMatch();
    const { symbol } = match.params;
    const [ stockData, setStockData] = useState([]);
    console.log("🚀 ~ file: CryptoOverviewDetail.js ~ line 12 ~ CryptoOverviewDetail ~ stockData", stockData)

    const [ symbolData, setSymbolData ] = useState();

    const config = {
        data: stockData,
        xField: 'time',
        yField: ['open', 'close', 'high', 'low'],
      };

    useEffect(() => {
        fetch(
            `https://api-osmosis.imperator.co/tokens/v1/${symbol}`
        ).then(response => {
            return response.json();
        }).then(data =>{
            setSymbolData(data)
        })
    }, [])

    useEffect(() => {
        fetch(
            `https://api-osmosis.imperator.co/tokens/v1/historical/${symbol}/chart?range=7d`
        ).then(response => {
            return response.json();
        }).then(data => {
            setStockData(data)
        })
    }, [])

    return (
        <React.Fragment>
        <Row>

        </Row>
        <Row gutter={30} style={{marginLeft: 30, marginRight: 30}}>
            <Col span={6}>
                <Card>
                <div>
                    <h1>{_.get(symbolData, '[0].name')} ({_.get(symbolData, '[0].symbol')})</h1>
                    <h1>
                        <p>{_.get(symbolData, '[0].price')}</p>
                        <p>{_.get(symbolData, '[0].liquidity')}</p>
                        <p>{_.get(symbolData, '[0].volume_24h')}</p>
                        <p>{_.get(symbolData, '[0].price')}</p>
                    </h1>
                </div>
                </Card>
            </Col>
            <Col span={18}>
                <Card bodyStyle={{backgroundColor: 'white'}}>
                {stockData && <Stock {...config} />}
                </Card>
            </Col>
        </Row>
        </React.Fragment>
    )
}

export default CryptoOverviewDetail
