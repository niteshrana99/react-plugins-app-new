import React from 'react';
import './Switch.styles.css';

const Switch = ({checked, onChange, type, children}) => {

    const handleSwitchClick = () => {
        onChange && onChange();
    }
    return (
        <div>
            <label className={`switch ${type}`}>
                <input type="checkbox" checked={checked} onChange={handleSwitchClick} />
                <span className="slider round"></span>
            </label>
            {children}
        </div>
    )
}

export default Switch