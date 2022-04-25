import React from 'react'
import { useAppContext } from '../../hooks/useAppContext';
import Plugin from './Plugin';
import './Plugins.styles.css';

const Plugins = ({selectedIndex}) => {
  const { appContext} = useAppContext();
  const { data } = appContext.state;
  
  const getHeading = () => {
    if(selectedIndex === 0) {
      return 'Marketing Plugins'
    } else if(selectedIndex === 1) {
      return 'Financial Plugins'
    } else {
      return 'Personnel Plugins'
    }
  }

  return (
    <div>
    <h2 className='plugin_heading'>{getHeading()}</h2>
    
    <div className='plugins_wrapper'>
    {
      data[selectedIndex].plugins.map((item) => {
        return <Plugin key={item.info.title} item={item} selectedIndex={selectedIndex} />
      })
    }
    </div>
    </div>
  )
}

export default Plugins