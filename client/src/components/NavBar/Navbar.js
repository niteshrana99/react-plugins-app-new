import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.styles.css';
import Switch from '../Switch/Switch';
import { useAppContext } from '../../hooks/useAppContext';

const Navbar = ({ navData }) => {
    const router = useLocation();
    const {appContext, inactivateAllPlugins, activateAllPlugins} = useAppContext()
    const [switchState, setSwitchState] = useState(true);

    const getTabId = () => {
        if(router.pathname === "/") {
            return 'tab1';
        } else if(router.pathname === "/finance") {
            return 'tab2';
        } else {
            return 'tab3';
        }
    }

    const handleSwitchChange = () => {
        setSwitchState(!switchState);
        if(!switchState) {
            activateAllPlugins(appContext.dispatch, appContext.state.response, getTabId())
        } else {
            inactivateAllPlugins(appContext.dispatch, appContext.state.response, getTabId())
        }
    }
    
    return (
        <div className='navbar_wrapper'>
            <h1>DataGuard</h1>
            <ul className='menu'>
                {
                    navData.map((navItem, index) => (
                        <li key={index} className={classNames('menu_item', { 'active': router.pathname === navItem.tabUrl })}>
                            <Link  to={navItem.tabUrl}><span className={navItem.icon}></span> <span>{navItem.tabName} </span></Link>
                        </li>
                    ))
                }
            </ul>
            <div className={classNames(
                'switch_wrapper',
                { 'plugins_disabled': !switchState },
                { 'plugins_enabled': switchState })}>
                {switchState && <p className='switch_info'>All Plugins Enabled</p>}
                {!switchState && <p className='switch_info'>All Plugins Disabled</p>}
                <Switch checked={switchState} onChange={handleSwitchChange} />
            </div>

        </div>
    )
}

export default Navbar