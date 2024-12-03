import type { FC, ReactNode } from 'react'
import React from 'react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'

interface FieldType {
  username?: string
  password?: string
  remember?: string
}

const ModalForm: FC<{ title: string, onResolve: Function, onReject: Function }> = ({ title, onResolve, onReject }) => {
  return (
    <Modal open={true} title={title} footer={null} onCancel={() => onReject()}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={(result) => onResolve(result)}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalForm
