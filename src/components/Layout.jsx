import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { SimpleLink } from '../Shared/Components/Controls';

const { Content, Footer, Sider } = Layout;

export class PageLayout extends React.Component {
    state = {
        collapsed: false,
    };

    static propTypes = {
        renderMenu: PropTypes.func,
    };

    static defaultProps = {
        renderMenu: () => null,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
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
                    <Content style={{ margin: '16px', height: '100%', position: 'relative' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Planning Poker</Footer>
                </Layout>
            </Layout>
        );
    }
}
