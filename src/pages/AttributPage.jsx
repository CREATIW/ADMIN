import {
  Button,
  Collapse,
  Form,
  Input,
  List,
  message,
  Modal,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  attrebuteAddUrl,
  attrebuteListUrl,
  getAttributeDeleteUrl,
  getAttributeUpdateUrl,
  getAttributeValueAddUrl,
  getAttributeValueDeleteUrl,
  getAttributeValueUpdateUrl,
} from "../helpers/url";
import {
  useDeleteRequest,
  useLoad,
  usePostRequest,
  usePutRequest,
} from "../hooks/request";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  catchSelectedCategory,
  deleteProps,
  genereteCategoriesList,
  slugify,
} from "../helpers/helpers";
const { Panel } = Collapse;

const initialAttributeData = {
  id: null,
  name_uz: "",
  name_ru: "",
  slug: "",
  is_filterable: 0,
};
const initialAttributeValueData = {
  id: null,
  attribute_id: null,
  value_uz: "",
  value_ru: "",
};

function AttributPage() {
  const { loading, response, request } = useLoad({ url: attrebuteListUrl });
  const attributePostRequest = usePostRequest({ url: attrebuteAddUrl });
  const attributeEditRequest = usePutRequest();
  const [attributeData, setAttributeData] = useState(initialAttributeData);
  const attributeValuePostRequest = usePostRequest();
  const attributeValueEditRequest = usePutRequest();
  const [attributeValueData, setAttributeValueData] = useState(
    initialAttributeValueData
  );
  const AttributeDeleteRequest = useDeleteRequest();
  const [modalOpen, setModalOpen] = useState(false);

  const handleFinishAttribute = async () => {
    const { name_uz } = deleteProps(attributeData, ["id"]);
    const posted_data = {
      ...deleteProps(attributeData, ["id"]),
      slug: slugify(name_uz),
    };

    if (attributeData.id) {
      const { reponse, success } = await attributeEditRequest.request({
        url: getAttributeUpdateUrl(attributeData.id),
        data: posted_data,
      });

      if (success) {
        message.success("Attribute muvaffaqiyatli yangilandi!");
        setAttributeData(initialAttributeData);
        request();
      }
    } else {
      const { response, success } = await attributePostRequest.request({
        data: posted_data,
      });
      if (success) {
        console.log(response);
        message.success("Attribute muvaffaqiyatli qo'shildi!");
        setAttributeData(initialAttributeData)
        request();
      }
    }
  };

  const handleFinishAttributeValue = async () => {
    const posted_data = deleteProps(attributeValueData, ["id", "attribute_id"]);

    if (attributeValueData.id) {
      const { reponse, success } = await attributeValueEditRequest.request({
        url: getAttributeValueUpdateUrl(attributeValueData?.id),
        data: posted_data,
      })
      if (success) {
        message.success("Attribute value muvaffaqiyatli yangilandi!");
        setAttributeValueData(initialAttributeValueData);
        request();
      }
    } else {
      const { response, success } = await attributeValuePostRequest.request({
        url: getAttributeValueAddUrl(attributeValueData?.attribute_id),
        data: posted_data,
      });
      if (success) {
        console.log(response);
        message.success("Attribute value muvaffaqiyatli qo'shildi!");
        setAttributeValueData(initialAttributeValueData)
        request();
      }
    }
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setAttributeData({ ...attributeData, [name]: value });
  };

  const handleChangeValue = ({ target }) => {
    const { value, name } = target;
    setAttributeValueData({ ...attributeValueData, [name]: value });
  };

  const handleEditBtn = (item) => {
    setAttributeData(deleteProps(item, ["attributeValues"]));
  };
  const handleEditBtnValue = (item) => {
    setAttributeValueData(deleteProps(item, ['created_at', 'updated_at']))
  }

  const handleDeleteBtn = (item) => {
    setAttributeData({ ...attributeData, id: item.id });
    setModalOpen(true);
  };

  const handleDeleteBtnValue = (item) => {
    setAttributeValueData({ ...attributeValueData, id: item.id });
    setModalOpen(true);
  }

  const handleModalOk = async () => {
    const { success } = await AttributeDeleteRequest.request({
      url: attributeData.id ? getAttributeDeleteUrl(attributeData.id) : getAttributeValueDeleteUrl(attributeValueData.id),
    });

    if (success) {
      message.success("Attribute muvaffaqiyatli o'chirildi!");
      handleModalClose()
      request();
    }
  };
  const handleModalClose = () => {
    setAttributeData(initialAttributeData);
    setAttributeValueData(initialAttributeValueData)
    setModalOpen(false);
  };
  const genExtra = (item, isAttribute) => (
    <Space>
      <Button icon={<EditOutlined />} onClick={() => isAttribute ? handleEditBtn(item) : handleEditBtnValue(item)} />
      <Button
        danger
        icon={<DeleteOutlined />}
        onClick={() => isAttribute ? handleDeleteBtn(item) : handleDeleteBtnValue(item)}
      />
    </Space>
  );
  return (
    <>
      <PageHeader title="Attributlar" />
      {loading ? (
        <Spin />
      ) : (
        <div className="container">
          <Row wrap={false} justify="space-between">
            <Form
              name="basic"
              layout="vertical"
              style={{ width: "30%" }}
              onFinish={handleFinishAttribute}
            >
              <Form.Item
                label="Attribute nomi UZ"
                rules={[
                  {
                    required: true,
                    message: "Attribute nomini kiriting!",
                  },
                ]}
              >
                <Input
                  value={attributeData?.name_uz}
                  name="name_uz"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Attribute nomi RU"
                rules={[
                  {
                    required: true,
                    message: "Attribute nomini kiriting!",
                  },
                ]}
              >
                <Input
                  value={attributeData?.name_ru}
                  name="name_ru"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {attributeData.id ? "Update" : "Add"}
                </Button>
                {
                  attributeData.id && <Button type="text" htmlType="reset" onClick={() => setAttributeData(initialAttributeData)}>
                    Reset
                  </Button>
                }
              </Form.Item>
            </Form>

            <Form
              name="basic"
              layout="vertical"
              style={{ width: "30%" }}
              onFinish={handleFinishAttributeValue}
            >
              <Form.Item
                label="Attribute value name UZ"
                rules={[
                  {
                    required: true,
                    message: "Attribute nomini kiriting!",
                  },
                ]}
              >
                <Input
                  value={attributeValueData?.value_uz}
                  name="value_uz"
                  onChange={handleChangeValue}
                />
              </Form.Item>
              <Form.Item
                label="Attribute value name RU"
                rules={[
                  {
                    required: true,
                    message: "Attribute value nomini kiriting!",
                  },
                ]}
              >
                <Input
                  value={attributeValueData?.value_ru}
                  name="value_ru"
                  onChange={handleChangeValue}
                />
                <Form.Item
                  label="Attributni tanlang"
                  rules={[
                    {
                      required: true,
                      message: "Attributni tanlang!",
                    },
                  ]}
                >
                  <Select
                    onChange={(e) =>
                      handleChangeValue({
                        target: { value: e, name: "attribute_id" },
                      })
                    }
                    // defaultValue={attributeData?.parent_id}
                    value={catchSelectedCategory(response?.attributes, attributeValueData?.attribute_id)}
                    options={genereteCategoriesList(response?.attributes)}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {attributeValueData.id ? "Update" : "Add"}
                  </Button>
                  {
                    attributeValueData.id && <Button type="text" htmlType="reset" onClick={() => setAttributeValueData(initialAttributeValueData)}>
                      Reset
                    </Button>
                  }
                </Space>
              </Form.Item>
            </Form>
          </Row>
          <Collapse defaultActiveKey={["1"]}>
            {response?.attributes?.map((item) => (
              <Panel
                header={item?.name_uz}
                key={item.id}
                extra={genExtra(item, true)}
              >
                {!!item?.attributeValues?.length ? (
                  <List
                    bordered
                    dataSource={item?.attributeValues}
                    renderItem={(el) => (
                      <List.Item extra={genExtra(el, false)}>{el?.value_uz}</List.Item>
                    )}
                  />
                ) : (
                  <p>Item content</p>
                )}
              </Panel>
            ))}
          </Collapse>
        </div>
      )}
      <>
        <Modal
          title="O'chirish"
          open={modalOpen}
          onOk={handleModalOk}
          onCancel={handleModalClose}
          okType="danger"
          okText="HA"
          cancelText="YO'Q"
        >
          <p>Attributeni o'chirmoqchimisiz?</p>
        </Modal>
      </>
    </>
  );
}

export default AttributPage;
