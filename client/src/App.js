import './App.css';
import Navbar from './components/NavBar/Navbar';
import {
  Routes,
  Route
} from 'react-router-dom'
import Plugins from './components/Plugins/Plugins';
import { useAppContext } from './hooks/useAppContext';
import { useEffect } from 'react';

function App() {

  const { appContext, fetchPluginsData} = useAppContext();
  const { dispatch } = appContext;
  const { data } = appContext.state;
  useEffect(() => {
    fetchPluginsData(dispatch);
  }, [])

  return (
    <div className="App">
     <Navbar navData={data} />
     <Routes>
          {data.map((tabItem, index) => {
            const path = index === 0 ? "/" : tabItem.tabUrl;
            return <Route key={path} path={path} element={<Plugins selectedIndex={index} />} />
          })}
         </Routes>
    </div>
  );
}

export default App;
