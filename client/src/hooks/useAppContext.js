import React from "react"
import { AppContext } from "../Context/context"
import { formatData } from "../utils/dataMapper";

export const useAppContext = () => {
    const appContext = React.useContext(AppContext);
    if(!appContext) {
        throw new Error("UseAppContext hook must be used inside propper context provider");
    }

    async function fetchPluginsData(dispatch) {
        dispatch({type:"FETCH_APP_DATA"});
        try {
            let response = await fetch("http://localhost:3001/pluginsInfo");
            response = await response.json();
            const data = formatData(response.data);
            dispatch({type:"FETCH_DATA_SUCCESS", payload: {data, response}});
        } catch(error) {
        }
        
    };

    async function inactivateAllPlugins(dispatch ,prevResponse, tabName) {
        const data = prevResponse.data;
        const set = new Set([...data.tabdata[tabName].active, ...data.tabdata[tabName].disabled]);
        data.tabdata[tabName].inactive.push(...set);
        
        data.tabdata[tabName].active = [];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prevResponse)
        }
        try {
             await fetch("http://localhost:3001/pluginsInfo", requestOptions);
            fetchPluginsData(dispatch);
        } catch(e) {
        }
    }

    async function activateAllPlugins(dispatch, prevResponse, tabName) {
        const data = prevResponse.data;
        const set = new Set([...data.tabdata[tabName].inactive, ...data.tabdata[tabName].disabled]);
        data.tabdata[tabName].active.push(...set);
        
        
        data.tabdata[tabName].inactive = [];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prevResponse)
        }
        try {
            await fetch("http://localhost:3001/pluginsInfo", requestOptions);
            fetchPluginsData(dispatch);
        } catch(e) {
        }
    }


    async function postPluginCheckboxChange(dispatch,prevResponse, plugin, tab, value) {
        const data = prevResponse.data;
        if(value === false) {
            data.tabdata[tab].disabled.push(plugin);
        } else {
            data.tabdata[tab].disabled = data.tabdata[tab].disabled.filter((item) => {
                if(item !== plugin) return item;
            });
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prevResponse)
        }
        try {
            await fetch("http://localhost:3001/pluginsInfo", requestOptions);
            fetchPluginsData(dispatch);
        } catch(e) {
        }
    }

    return {
        appContext,
        fetchPluginsData,
        inactivateAllPlugins,
        activateAllPlugins,
        postPluginCheckboxChange
    }
}