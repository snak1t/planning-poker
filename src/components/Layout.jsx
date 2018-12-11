import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { SimpleLink } from '../Shared/Components/Controls';

const { Content, Footer, Sider } = Layout;

const StyledLayout = styled(Layout)`
    min-height: 100vh !important;
`;
const StyledContent = styled(Content)`
    margin: 16px;
    height: 100%;
    position: relative;
`;
const StyledFooter = styled(Footer)`
    text-align: center;
`;

export function PageLayout({ children }) {
    const [collapsed, setCollapsedState] = useState(false);

    return (
        <StyledLayout>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsedState}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <SimpleLink to="/">
                            <Icon type="pie-chart" />
                            <span>Main</span>
                        </SimpleLink>
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
