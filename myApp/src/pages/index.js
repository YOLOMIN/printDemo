import styles from './index.css';
import { Layout } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css';
import LayoutBasic from './LayoutBasic';
const { Header, Footer, Sider, Content } = Layout;
export default function() {
  return (
    <div>
      <LayoutBasic />
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}
