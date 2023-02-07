import React, { useState } from 'react'
import { Card, Form, Modal, Row, Input, Upload, message, Button } from 'antd'
import PageHeader from '../components/PageHeader'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteRequest, useLoad, usePatchRequest, usePostRequest, usePutRequest } from '../hooks/request';
import { addFileUrl, brandAddUrl, brandListUrl, deleteFileUrl, getBrandDeleteUrl, getBrandUpdateUrl } from '../helpers/url';
import FullPageLouder from '../components/FullPageLouder';
import { deleteProps, getEncryptedCode } from '../helpers/helpers';
import { MediaAxios } from '../helpers/axios';
const { Meta } = Card;
const initialBrandData = {
  id: null,
  name_uz: '',
  name_ru: '',
  image: '',
}
function BrandsPage() {
  const { response, loading, request } = useLoad({ url: brandListUrl })
  const brandPostRquest = usePostRequest({ url: brandAddUrl })
  const brandDeleteRquest = useDeleteRequest()
  const brandUpdateRquest = usePutRequest()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [brandData, setBrandData] = useState(initialBrandData)

  const handleOk = async () => {
    const postData = deleteProps(brandData, ['id'])
    for (const key in postData) {
      if (postData[key] === initialBrandData[key]) {
        return message.error(`${key} maydonini to'ldiring!`)
      }
    }

    if (brandData.id) {
      const { success, response } = await brandUpdateRquest.request({
        url: getBrandUpdateUrl(brandData.id),
        data: { ...postData, image: '' },
      })
      if (success) {
        request()
      }
    } else {
      const { success, response } = await brandPostRquest.request({
        data: postData,
      })
      if (success) {
        request()
      }
    }
    setIsModalOpen(false)
  }

  const handleChange = ({ target }) => {
    const { value, name } = target
    setBrandData({ ...brandData, [name]: value })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setBrandData(initialBrandData)
    setFileList([])
  };

  const handleAddBtn = () => {
    setIsModalOpen(true)
  }

  const onChange = ({ file }) => {
    // setFileList(newFileList);

    const encryptCode = getEncryptedCode()

    const headers = {
      'x-auth-key': encryptCode,
    }
    if (file.status === 'removed') {
      const key = file.url.split('/').splice(3).join('/')
      MediaAxios.post(deleteFileUrl, { key }, { headers })
        .then(function (response) {
          if (response.data.id) {
            handleChange({ target: { value: '', name: 'image' } })
          }
          setFileList([])

        }).catch(function (error) {
          message.error(error.data.message)
        })
    } else {
      const formData = new FormData()
      formData.append('file', file.originFileObj)
      formData.append('project', 'ecommerce')

      MediaAxios.post(addFileUrl, formData, { headers })
        .then(function (response) {
          if (response.data.url) {
            handleChange({ target: { value: response.data.url, name: 'image' } })
          }
          setFileList([...fileList, {
            uid: response.data.id,
            name: file.name,
            status: 'done',
            url: response?.data?.url
          }])

        }).catch(function (error) {
          message.error(error.data.message)
        })
    }


  };

  const handleDeleteModalOkBtn = async () => {
    const { success, response } = await brandDeleteRquest.request({ url: getBrandDeleteUrl(brandData.id) })
    if (success) {
      request()
      setDeleteModalOpen(false)
    }
  }
  const handleDeleteModalCloseBtn = () => {
    setBrandData(initialBrandData)
    setDeleteModalOpen(false)
  }

  const handleDeleteBtn = (id) => {
    setBrandData({ ...brandData, id })
    setDeleteModalOpen(true)
  }

  const handleEditBtn = (item) => {
    setBrandData({
      id: item.id,
      name_uz: item.name_uz,
      name_ru: item.name_ru,
      image: item.image,
    })
    setFileList([...fileList, {
      uid: item.id,
      name: item.name_uz,
      status: 'done',
      url: item.image
    }])
    setIsModalOpen(true)
  }
  return (
    <>
      <PageHeader title='Brand' btnTitle="Brand qo'shish" handleClick={handleAddBtn} />

      <Row className='container'>
        {loading ? <FullPageLouder className='container' /> :
          response?.brands.map((item) => (
            <Card
              key={item.id}
              style={{
                width: 300,
                marginBottom: 16,
                marginRight: '15px',
                padding: '10px',
              }}
              cover={
                <img
                  alt={item.name_uz}
                  src={item.image}
                />
              }
              actions={[
                <Button type='text' onClick={() => handleEditBtn(item)}>
                  <EditOutlined key="edit" />
                </Button>,
                <Button type='text' onClick={() => handleDeleteBtn(item.id)}>
                  <DeleteOutlined key="delete" />
                </Button>,
              ]}
            >
              <Meta
                title={item.name_uz}
              />
            </Card>
          ))
        }
      </Row>
      <Modal title="Banner Qo'shish" open={isModalOpen} okText={brandData.id ? 'Update' : 'Add'} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
        >
          <Form.Item
            label="Name uz"
          >
            <Input name='name_uz' value={brandData.name_uz} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Name ru"
          >
            <Input name='name_ru' value={brandData.name_ru} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Rasm"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </Form.Item>

        </Form>
      </Modal>

      <Modal title="O'chirish" open={deleteModalOpen} onOk={handleDeleteModalOkBtn} onCancel={handleDeleteModalCloseBtn} okType='danger' okText="HA" cancelText="YO'Q">
        <p>Brandni o'chirmoqchimisiz?</p>
      </Modal>

    </>
  )
}

export default BrandsPage