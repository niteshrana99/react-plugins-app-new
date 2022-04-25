import React, { useReducer } from 'react';

export const AppContext = React.createContext();

const initState = {
    isLoading: false,
    data: [],
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'FETCH_APP_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                response: action.payload.response,
                isLoading: false
            }
        case 'default':
            return {
                ...state
            }
    }
};

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
}

