/* eslint-disable no-unused-vars */
import "./Sidebar.css"
import logoSoict from '../../assets/logo-soict.png'
import { SidebarManagerData } from './SidebarManagerData.jsx'

const SidebarManger = () => {


  return (
    <div className='Sidebar'>
          
      <div className='logo'>
          <img src={logoSoict} alt='' style={{width: "150px", height: "120px"}}/>
      </div>

      <ul className='SidebarList'>
        {
          SidebarManagerData.map((val,key) =>{
            return(
              <li 
                key={key} 
                onClick={() => window.location.pathname = val.link}
                className='row'
                id={window.location.pathname.startsWith(val.link) ? "active" : ""}
              >
                {""}
                <div id='icon'>{val.icon}</div>
                <div id='title'>
                    {val.title}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
    
  )
}

export default SidebarManger