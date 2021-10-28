import React from 'react'
import { useRouteMatch } from 'react-router'
import { useEffect, useState } from 'react'
import {Row, Col, Card} from 'antd'
import { Stock } from '@ant-design/charts';
import _ from 'lodash';
import classes from './CryptoOverviewDetail.module.css';

const CryptoOverviewDetail = () => {
    const match = useRouteMatch();
    const { symbol } = match.params;
    const [ stockData, setStockData] = useState([]);

    const [ symbolData, setSymbolData ] = useState();

    var nf = new Intl.NumberFormat();

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
        <div className={classes.cryptoOverviewDetailLayout}>
            <Row>
            
                <h1>
                    <p className={classes.headerRow}>{_.get(symbolData, '[0].name')} ({_.get(symbolData, '[0].symbol')})</p>
                    <p className={classes.priceOverview}>${_.get(symbolData, '[0].price')}</p>
                </h1>
            </Row>
            <Row gutter={20}>
                <Col span={6}>
                    <Card className={classes.card}>
                    <div>
                        <h1>
                            <p className={classes.cryptoInformation}>Liquidity</p>
                            <p className={classes.cryptoDetails}>${nf.format(_.get(symbolData, '[0].liquidity'))}</p>
                            <p className={classes.cryptoInformation}>Volume (24hr)</p>
                            <p className={classes.cryptoDetails}>${nf.format(_.get(symbolData, '[0].volume_24h'))}</p>
                            <p className={classes.cryptoInformation}>Price</p>
                            <p className={classes.cryptoDetails}>${nf.format(_.get(symbolData, '[0].price'))}</p>
                        </h1>
                    </div>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card className={classes.card}>
                    {stockData && <Stock {...config} />}
                    </Card>
                </Col>
            </Row>
        </div>
        </React.Fragment>
    )
}

export default CryptoOverviewDetail
