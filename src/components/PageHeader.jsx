import React from 'react'
import { Button, Row,Typography } from 'antd'
const {Title} = Typography
function PageHeader(props) {
  const {title, btnTitle, handleClick} = props
  return (
    <Row justify='space-between' align='center' className='container pageHeader'>
    <Title level={2}>{title}</Title>
    {btnTitle && <Button onClick={handleClick}>{btnTitle}</Button>}
   </Row>
  )
}

export default PageHeader