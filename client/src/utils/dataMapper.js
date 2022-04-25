const setPluginInfo = (state, plugin, plugins, isDisabled) => {
    const pluginObj = {};
    pluginObj.switch = !isDisabled;
    pluginObj.state = state;
    pluginObj.id = plugin;
    pluginObj.info = plugins[plugin];
    return pluginObj;
}

const getTabData = (tab, plugins, tabdata, tabIndex) => {
    const mappedObj = {};
    mappedObj.tabName = tabdata[tab].title;
    mappedObj.icon = tabdata[tab].icon
    mappedObj.tabUrl = tabIndex === 0 ? '/' : `/${tabdata[tab].title.toLowerCase()}`;
    mappedObj.plugins = []; 
    for(const plugin in plugins) {
        if(tabdata[tab].active.includes(plugin)) {
            mappedObj.plugins.push(setPluginInfo('active', plugin, plugins, tabdata[tab].disabled.includes(plugin)))
        } else if(tabdata[tab].inactive.includes(plugin)) {
            mappedObj.plugins.push(setPluginInfo('inactive', plugin, plugins, tabdata[tab].disabled.includes(plugin)))
        } else if(tabdata[tab].disabled.includes(plugin)) {
            mappedObj.plugins.push(setPluginInfo('disabled', plugin, plugins, tabdata[tab].disabled.includes(plugin)))
        }
    }
    return mappedObj;
}

export const formatData = (data) => {
    const { tabs, plugins, tabdata } = data;
    return tabs.map((tab, tabIndex) => {
       return getTabData(tab, plugins, tabdata, tabIndex);
    });
}