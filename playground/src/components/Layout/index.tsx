import { ReactNode } from "react";
import { Button, Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import "./index.scss";

const { Header, Footer, Content } = Layout;

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className="app-layout">
      <Header className="header">
        <div className="logo">
          <h1>MD Playground</h1>
        </div>
        <div className="actions">
          <Button
            type="link"
            key="github"
            href="https://github.com/ShenBao/fastx-md-playground"
            target="_blank"
            rel="noreferrer"
          >
            <GithubOutlined />
          </Button>
        </div>
      </Header>
      <Content className="content">{children}</Content>
      <Footer className="footer">
        <div>
          Made with ❤ by
          <Button
            type="link"
            size="small"
            href="https://github.com/ShenBao"
            target="_blank"
            rel="noreferrer"
          >
            ShenBao
          </Button>
          , the repositorier is
          <Button
            type="link"
            size="small"
            href="https://github.com/ShenBao/fastx-md-playground"
            target="_blank"
            rel="noreferrer"
          >
            here
          </Button>
          .
        </div>
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
