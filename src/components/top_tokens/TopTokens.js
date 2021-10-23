import { Row, Card, Col, Table} from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import React from 'react'
  
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
    //   key: 'name',
      render: (text, row, index) => {
        return <Row>
            <img style={{width: 25, height: 25, marginRight: 10}} src={row.image}/>
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
        <div style={{marginLeft: 30, marginRight: 30}}>
            <Row>
                <p style={{color: 'white'}}>Top Tokens</p>
            </Row>
            <Row>
                <Col span={24}>
                    <Card bodyStyle={{backgroundColor: 'white'}}>
                    {tokenData && <Table onRow={onRow} dataSource={tokenData} columns={columns} />}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default TopTokens
