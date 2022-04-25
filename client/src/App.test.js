import { mount, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppContext } from './Context/context';

describe("rendering components", () => {
    it("Should render app component without crashing", () => {
       const wrapper = mount(
            <AppContext.Provider value={{
                dispatch: jest.fn(),
                state: { data: [] }
              }}>
                  <BrowserRouter>
                <App />
                </BrowserRouter>
            </AppContext.Provider>
        );
        expect(wrapper.find(".App")).toHaveLength(1);
    });


})