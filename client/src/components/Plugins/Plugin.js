import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import Switch from '../Switch/Switch';

const Plugin = ({ item, selectedIndex }) => {

    const [switchState, setSwitchState] = useState(false);

    useEffect(() => {
        setSwitchState(item.switch)
    }, [item])

    const { appContext, postPluginCheckboxChange } = useAppContext()

    const getButtonInfo = () => {
        return switchState ? <span style={{ color: 'green' }}>Allowed</span> : <span style={{ color: 'red' }}>Blocked</span>;
    }

    const getTabId = () => {
        if(selectedIndex === 0) {
            return 'tab1';
        } else if(selectedIndex === 1) {
            return 'tab2';
        } else {
            return 'tab3';
        }
    }

    const handleSwitchChange = () => {
        setSwitchState(!switchState);
        postPluginCheckboxChange(appContext.dispatch, appContext.state.response, item.id, getTabId(), !switchState);
    }

    return (
        <div className={classNames('plugins_item', { 'inactive': item.state === 'inactive' })}>
            <div className='item_top'>
                <h4>{item.info.title}</h4>
                <Switch type="sm" checked={switchState} onChange={handleSwitchChange}>
                    <p className='button_info'>{getButtonInfo()}</p>
                </Switch>
            </div>
            <p>{item.info.description}</p>
        </div>
    )
}

export default Plugin