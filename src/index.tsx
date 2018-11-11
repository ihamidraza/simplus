import * as React from "react"
import * as ReactDOM from "react-dom"
import { compose } from "redux";
import { Provider, connect } from "react-redux";
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router'

import configureStore from './store'
import {Redirect, Switch, Link, NavLink} from "react-router-dom";
import {Menu, Dropdown, Icon} from "antd"
import MediaQuery from "react-responsive"

import "antd/dist/antd.less";
import "../style/index.less";
import "@simplus/siui/style/index.less";
import "@simplus/macaw-business/style/index.less";

import { LocaleProvider } from 'antd';
import * as enUS from 'antd/lib/locale-provider/en_US';

import {NavBar, Select} from "@simplus/siui"
import SimplusUI from "./pages/simplus-ui"
import Mockup from "./pages/mockup/Mockup"
import Solutions from "./pages/solutions/Solutions"
import Home from "./pages/home/Home";
import Login from './pages/login';
import Logout from './pages/logout';
import Content from './pages/content';
import Footer from "./pages/simplus-ui/components/Footer"

const enhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory({basename: '/'});
const store = configureStore(history);
const NavBarItem = NavBar.Item;

class Routes extends React.Component<any, any>{
	

	constructor(){
		super()
		this.state = {
			visible : true
			isValid: false
		}
		this.handleMenuClick = this.handleMenuClick.bind(this)
		this.handleVisibleChange = this.handleVisibleChange.bind(this)
	}
	componentWillMount(){
		const { user } = this.props;
		if(user){
			const validation = /@simplusinnovation\.com$/;
			if(validation.test(user.email)){
				this.setState({isValid: true});
				history.push('/');
			} else {
				history.push('/content')
			}
		} else {
			history.push('/login');
		}
	}

	handleSelect(value : string){
	  var val : string = value
	  window.location.replace(`#/components/${val.toLowerCase().replace(new RegExp(" ", "g"),"-")}`)
	}
	
	handleMenuClick(e){
    if (e.key != '5') {
      this.setState({ visible: false });
    }
	}
	
	handleVisibleChange = (flag) => {
		console.log(flag)
    this.setState({ visible: flag });
	}
	renderHeader(){
		const { user } = this.props;
		const { isValid } = this.state;
		if(user && isValid){
			const SelectOptions = ["Affix", "Alert", "Card", "Icon And Name", "Input", "Jumbo Button", "Left Menu", "Modal", "Picture", "Profile", "Select", "Sub Left Menu", "Table", "Tabs", "Titled Card"]
	const Option = Select.Option;
	const SelectComponent = (
	<Select 
		//prefixCls="si-select"
		// icon={<Icon type="search"/>}
		className="search-component"
		mode="combobox"
		borderless
		placeholder="Search components..."
		style={{width:200, color:"#FFF"}}
		dropdownMenuStyle={{ maxHeight: '200px' }}
		onSelect={this.handleSelect}
	>
		{ SelectOptions.map((option, i) => {
		return <Option value={option} key={i}>{option}</Option>
		}) }
	</Select>)
	const menu = (
		<Menu onClick={this.handleMenuClick}>
			<Menu.Item key="0"><NavLink activeClassName="active" defaultChecked to="/home"  >Home</NavLink></Menu.Item>
			<Menu.Item key="1"><NavLink activeClassName="active" to="/components"  >Weaver</NavLink></Menu.Item>
			<Menu.Item key="2"><NavLink activeClassName="active" to="/solutions"  >Solutions</NavLink></Menu.Item>
			<Menu.Item key="3"><NavLink activeClassName="active" to="/mockups"  >Mockups</NavLink></Menu.Item>
			{/* <Menu.Item key="4">Settings</Menu.Item> */}
			<Menu.Divider />
			<Menu.Item key="5">{SelectComponent}</Menu.Item>
		</Menu>
	);
			return (
				<div>
				<MediaQuery query="(min-width: 1100px)">
						<NavBar picture={
						<div style={{ display : "flex", flexDirection : "row", position: "relative", width: "20%" }}>
							<img src="/assets/Logo-01.png" width="120px" height="43px" style={{ marginTop: "1rem", marginBottom : "1rem" }} className="si-logo"/>
							<div style={{ borderRight : "1px solid white", flex : "1", height: "30px", margin: "auto"}}/>
						</div>
							}
							components={SelectComponent}>
							
							<NavLink activeClassName="active" defaultChecked to="/home"  ><NavBarItem>Home</NavBarItem></NavLink>
							<NavLink activeClassName="active" to="/components"  ><NavBarItem>Weaver</NavBarItem></NavLink>
							<NavLink activeClassName="active" to="/solutions"  ><NavBarItem>Solutions</NavBarItem></NavLink>
							<NavLink activeClassName="active" to="/mockups"  ><NavBarItem>Mockups</NavBarItem></NavLink>
							{/* <NavBarItem>Settings</NavBarItem> */}
						</NavBar>
					</MediaQuery>
					<MediaQuery query="(max-width : 1099px)">
						<NavBar picture={
							<div style={{ display : "flex", flexDirection : "row", position: "relative",  margin : "auto" }}>
								<img src="/assets/Logo-01.png" width="120px" height="43px" style={{ marginTop: "1rem", marginBottom : "1rem" }} className="si-logo"/>
							</div>
								}>
							<Dropdown overlay={menu} trigger={["click"]} onVisibleChange={this.handleVisibleChange} visible={this.state.visible}>
							<Icon type="bars" style={{ margin : "auto", fontSize : "20", color : "white" }}/>
						</Dropdown>
						<Link to="/logout"><h3 style={{margin: 23, color: '#fff'}}>Logout</h3></Link>
						</NavBar>
					</MediaQuery>
					</div>
			)
		} else if (user && !isValid){
			<div>
				<MediaQuery query="(max-width : 1099px)">
					<NavBar picture={
						<div style={{ display : "flex", flexDirection : "row", position: "relative",  margin : "auto" }}>
							<img src="/assets/Logo-01.png" width="120px" height="43px" style={{ marginTop: "1rem", marginBottom : "1rem" }} className="si-logo"/>
						</div>
							}>
					<Link to="/logout"><h3 style={{margin: 23, color: '#fff'}}>Logout</h3></Link>
					</NavBar>
				</MediaQuery>
				</div>
		}
		return '';
	}

	render(){
	
  
	  return (
		<Router history={history}>
		  <Switch>
			<Route path="/">
			  <div>
					{this.renderHeader()}
				  <Switch>
						<Redirect exact from="/" to="/home"/>
						<Route path="/home" component={Home}/>
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route path="/content" component={Content} />
						<Route path="/components" component={SimplusUI}/>
						<Route path="/solutions" component={Solutions}/>
						<Route path="/mockups" component={Mockup}/>
				  </Switch>
				</div>
			</Route>
		  </Switch>
		</Router>
  
	  )
	}
  
  }
  export const App = connect(({ user }) => ({ user }))(Routes);
  ReactDOM.render(
		<LocaleProvider locale={enUS as any}>
			<Provider store={store}>
				<div>
					<App/>
				</div>
			</Provider>
		</LocaleProvider>
	  ,document.getElementById('mount'),
	  () => {
	}
  );