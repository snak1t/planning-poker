import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { AuthContext, LOGIN_STATUS } from '../../Data/Auth/AuthContext';

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
const FixedSidebar = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
`;

export const PageLayout: React.SFC<{}> = ({ children }) => {
    const [collapsed, setCollapsedState] = useState(true);
    const {
        user: { loginStatus, info },
        logout,
        login,
    } = useContext(AuthContext);

    return (
        <StyledLayout>
            <FixedSidebar collapsible collapsed={collapsed} onCollapse={setCollapsedState}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="home" />
                            <span>Main</span>
                        </Link>
                    </Menu.Item>
                    {loginStatus === LOGIN_STATUS.LOGGED_IN ? (
                        <Menu.SubMenu
                            key="user-menu"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span className="nav-text">{info.name}</span>
                                </span>
                            }
                        >
                            <Menu.Item key="user" onClick={logout}>
                                <Icon type="logout" />
                                <span className="nav-text">Logout</span>
                            </Menu.Item>
                        </Menu.SubMenu>
                    ) : (
                        <Menu.Item key="sing-in" onClick={login}>
                            <Icon type="login" />
                            <span className="nav-text">Login</span>
                        </Menu.Item>
                    )}
                </Menu>
            </FixedSidebar>
            <Layout>
                <StyledContent>{children}</StyledContent>
                <StyledFooter>Planning Poker</StyledFooter>
            </Layout>
        </StyledLayout>
    );
};
