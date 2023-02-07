import React, { useState } from 'react'
import { Row, Space, Table, Tag, Image, Button, Drawer, Tabs, Input, Form, Modal, Upload, Select } from 'antd'
import PageHeader from '../components/PageHeader'
import { attrebuteListUrl, brandListUrl, categoriesListUrl, productsListUrl } from '../helpers/url';
import { useLoad } from '../hooks/request';
import ReactQuill from 'react-quill';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import 'react-quill/dist/quill.snow.css'
import { genereteCategoriesList } from '../helpers/helpers';

const initialProductData = {
  id: null,
  name_uz: '',
  name_ru: '',
  description_uz: '',
  description_ru: '',
  slug: '',
  category_id: null,
  brand_id: null,
  quantity: 0,
  attributes:
      '[{"attribute_id":1,"value_id":2},{"attribute_id":2,"value_id":5}]',
  previous_price: 0,
  price: 0,
  image: '',
  images: '',
  discount: 0,

}

function ProductsPage() {
  const { response, loading, request } = useLoad({ url: productsListUrl })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [productData, setProductData] = useState(initialProductData)

const handleOnchange = ({ target }) => {
  const { name, value } = target
  setProductData({
      ...productData,
      [name]: value,
  })
}

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (item) => {
        return <Image width={200} src={item} />
      }
    },
    {
      title: 'Name',
      dataIndex: 'name_uz',
      key: 'name_uz',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='default'>
            <EditOutlined />
          </Button>
          <Button type='default'>
            <EyeOutlined />
          </Button>
          <Button type='' >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const tabContent = [
    {
      key: 1,
      label: "Mahsulot nomi ",
      children: <ProductNameProperties handleOnChange={handleOnchange} productData={productData }/>
    },
    {
      key: 2,
      label: "Mahsulot narxlari ",
      children: <ProductPriceProperties />
    },
    {
      key: 3,
      label: "Mahsulot rasmi ",
      children: <ProductPictureProperties />
    },
    {
      key: 4,
      label: "Mahsulot kategoriyalari ",
      children: <ProductCategoriesProperties />
    },
  ]
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }
  return (
    <>
      <Row className='container'>
        <PageHeader title='Mahsulotlar' btnTitle="Mahsulot qo'shish" handleClick={handleDrawerOpen} />
        <Table style={{ width: '100%' }} columns={columns} loading={loading} dataSource={response?.products} />
      </Row>

      <Drawer title="Mahsulot qo'shish" placement="right" onClose={handleDrawerClose} open={drawerOpen} width={'80%'}>
        <Tabs
          tabPosition='left'
          items={tabContent}
        />
      </Drawer>

    </>
  )
}

function ProductNameProperties({handleOnChange,  productData}) {
  console.log(productData)
  return (
    <div>
      <Form layout='vertical'>
        <Form.Item label="Mahsulot nomi uz:">
          <Input placeholder='' name='name_uz' value={productData.name_uz} onChange={handleOnChange}></Input>
        </Form.Item>
        <Form.Item label="Mahsulot nomi ru:">
          <Input placeholder='' name='name_ru' value={productData.name_ru} onChange={handleOnChange}></Input>
        </Form.Item>
        <Form.Item label="Mahsulot tasnifi uz:">
          <ReactQuill theme="snow" value={productData.description_uz} onChange={handleOnChange}/>
        </Form.Item>
        <Form.Item label="Mahsulot tasnifi ru:">
          <ReactQuill theme="snow" value={productData.description_uz} onChange={handleOnChange} />
        </Form.Item>
      </Form>
    </div>
  )
}
function ProductPriceProperties() {
  return (
    <Form layout='vertical'>
      <Form.Item label="Mahsulot narxi">
        <Input type="number" placeholder=''></Input>
      </Form.Item>
      <Form.Item label="Mahsulot soni">
        <Input type="number" placeholder=''></Input>
      </Form.Item>
      <Form.Item label="Mahsulot avvalki narxi">
        <Input type="number" placeholder=''></Input>
      </Form.Item>
      <Form.Item label="Mahsulot chegirmasi">
        <Input type="number" placeholder=''></Input>
      </Form.Item>
    </Form>
  )
}
function ProductPictureProperties() {


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}

function ProductCategoriesProperties() {
  const categoriesRequest = useLoad({ url: categoriesListUrl })
  const brandsRequest = useLoad({ url: brandListUrl })
  const attributesRequest = useLoad({ url: attrebuteListUrl })
  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      <div >
        <h3>Kategoriya</h3>
        <Select
          style={{ width: '100%' }}
          defaultValue={0}
          // onChange={handleChange}
          options={genereteCategoriesList(categoriesRequest?.response?.categories)}
        />
      </div>
      <div>
        <h3>Brand</h3>
        <Select
          style={{ width: '100%' }}
          defaultValue={0}
          // onChange={handleChange}
          options={genereteCategoriesList(brandsRequest?.response?.brands)}
        />
      </div>
      <div>
        <h3>Attributes</h3>
        <Select
          style={{ width: '100%' }}
          defaultValue={0}
          mode='multiple'
          // onChange={handleChange}
          options={genereteCategoriesList(attributesRequest?.response?.attributes)}
        />
      </div>
    </Space>
  )
}
export default ProductsPage