import { Row, Card, Col, Table} from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import React from 'react'
import classes from './TopTokens.module.css'
  
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
      title: 'Tokens',
      dataIndex: 'name',
      render: (text, row, index) => {
        return <Row>
            <img className={classes.logo} src={row.image}/>
            <p>{text}</p>
            <p style={{marginLeft: 5}}>({row.symbol})</p>
        </Row>;
      }
    },
    {
      title: 'Liquidity',
      dataIndex: 'liquidity',
      key: 'liquidity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title:'Valume (24h)',
      dataIndex: 'volume_24h',
      key: 'volume_24h',
    }
];

const injectIndex = (tokenData) => {
    const mapped = tokenData.map((data, index) => {
        return {
            image: `https://info.osmosis.zone/assets/${data.symbol.toLowerCase()}.png`,
            ...data,
        }
    })
    return mapped;
}

const TopTokens = () => {
    const [tokenData, settokenData] = useState();
    const history = useHistory();

    useEffect(() => {
        fetch(
            'https://api-osmosis.imperator.co/tokens/v1/all'
        ).then(response => {
            return response.json();
        }).then(data => {
            const indexedData = injectIndex(data)
            settokenData(indexedData);
        })
    }, [])

    const onRow = (record, rowIndex) => {
        
        return {
            onClick: event => {
                history.push(`/tokens/${record.symbol}`);
            }
        }
    }
    return (
        <div className={classes.topTokensLayout}>
            <Row>
                <p className={classes.headerRow}>Top Tokens</p>
            </Row>
            <Row>
                <Col span={24}>
                    <Card className={classes.card}>
                    {tokenData && <Table onRow={onRow} dataSource={tokenData} columns={columns} />}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default TopTokens
