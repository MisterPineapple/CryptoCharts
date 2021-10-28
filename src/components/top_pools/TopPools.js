import { Row, Card, Col, Table} from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import React from 'react'
import classes from './TopPools.module.css'
import _ from 'lodash'
const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text, row, index) => {
          index++;
          return <p>{index}</p>
      }
    },
    {
      title: 'Pools',
      render: (text, row, index) => {
        return <Row>
            <img className={classes.logo}  src={row.image_token1}/>
            <img className={classes.logo} src={row.image_token2}/>
            <p>{row.tokenpair}</p>
        </Row>;
      }
    },
    {
      title: 'Liquidity',
      dataIndex: 'liquidity',
      key: 'liquidity',
    },
    {
      title: 'Volume (24h)',
      dataIndex: 'volume_24h',
      key: 'volume_24h',
    },
    {
      title: 'Volume (7d)',
      dataIndex: 'volume_7d',
      key: 'volume_7d',
    },
];

const formatTokenPair = (data) => {
    const myarray = []
    const mapped = _.forOwn(data, function(value, key) {
        myarray.push({
            "tokenpair": `${value[0].symbol}-${value[1].symbol}`,
            "token1": `${value[0].symbol}`,
            "token2": `${value[1].symbol}`,
            "liquidity": `${value[0].liquidity}`,
            "volume_24h": `${value[0].volume_24h}`,
            "volume_7d": `${value[0].volume_7d}`,
        })
      });
    return myarray;
}

const injectIndex = (poolData) => {
    const mapped = poolData.map((data, index) => {
        return {
            image_token1: `https://info.osmosis.zone/assets/${data.token1.toLowerCase()}.png`,
            image_token2: `https://info.osmosis.zone/assets/${data.token2.toLowerCase()}.png`,
            ...data,
        }
    })
    return mapped;
}

function TopPools() {
    const [poolData, setpoolData] = useState();
    const history = useHistory();

    useEffect(() => {
        fetch(
            'https://api-osmosis.imperator.co/pools/v1/all'
        ).then(response => {
            return response.json();
        }).then(data => {
            const formatted = formatTokenPair(data)
            const indexedData = injectIndex(formatted)
            setpoolData(indexedData);
        })
    }, [])

    const onRow = (record, rowIndex) => {
        
        return {
            onClick: event => {
                history.push(`/pools/${record.symbol}`);
            }
        }
    }

    return (
        <div className={classes.topPoolsLayout}>
            <Row>
                <p className={classes.headerRow}>Top Tokens</p>
            </Row>
            <Row>
                <Col span={24}>
                    <Card className={classes.card}>
                    {poolData && <Table onRow={onRow} dataSource={poolData} columns={columns} />}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default TopPools
