import { mount } from "enzyme"
import { AppContext } from "../../Context/context";
import Plugin from "./Plugin"

describe('<Plugin />', () => {
    it('should render Plugin Component', () => {
        const wrapper = mount(
            <AppContext.Provider value={{
                dispatch: jest.fn(),
                state: { data: [] }
            }}>
                <Plugin selectedIndex={0} item={
                    {
                        switch: true,
                        state: 'inactive',
                        info: {
                            title: 'Plugin1',
                            description: 'This is a test description'
                        }
                    }



                } />
            </AppContext.Provider>
        );

        expect(wrapper.find('.plugins_item')).toHaveLength(1);
    });

    it('should render Plugin Component with Inactive state', () => {
        const wrapper = mount(
            <AppContext.Provider value={{
                dispatch: jest.fn(),
                state: { data: [] }
            }}>
                <Plugin selectedIndex={0} item={
                    {
                        switch: true,
                        state: 'inactive',
                        info: {
                            title: 'Plugin1',
                            description: 'This is a test description'
                        }
                    }

                } />
            </AppContext.Provider>
        );

        expect(wrapper.find('.inactive')).toHaveLength(1);
    });
})