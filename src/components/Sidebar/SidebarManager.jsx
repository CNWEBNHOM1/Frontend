/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Import CSS
import "./Sidebar.css"
// Import icons
import logoSoict from '../../assets/logo-soict.png'
import homeIcon from "../../assets/icon/IconHome.jsx"
import {Layout} from 'antd';
// Import actions
import { changeActiveSidebarItem, changeOpenedSidebarItem } from '../../actions/sidebar.js'
import IconHome from '../../assets/icon/IconHome.jsx'
import MenuList from '../MenuList/MenuList.jsx'

const SidebarManger = () => {

  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const {Header, Sider} = Layout;
  return (
    
      <Sider className='sidebar'>
          <div className='logo'>
            <img src={logoSoict} alt='' style={{width: "150px", height: "120px"}}/>
          </div>
          <MenuList />
      </Sider>
    
  )
}

export default SidebarManger