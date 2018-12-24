import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

const { Content, Footer, Sider } = Layout;

const StyledLayout = styled(Layout)`
    min-height: 100vh !important;
`;
const StyledContent = styled(Content)`
    height: 100%;
    padding: 1rem;
    position: relative;
`;
const StyledFooter = styled(Footer)`
    text-align: center;
`;

export function PageLayout({ children }) {
    const [collapsed, setCollapsedState] = useState(true);

    return (
        <StyledLayout>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsedState}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="pie-chart" />
                            <span>Main</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <StyledContent>{children}</StyledContent>
                <StyledFooter>Planning Poker</StyledFooter>
            </Layout>
        </StyledLayout>
    );
}
