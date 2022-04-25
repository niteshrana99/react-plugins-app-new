import sinon from 'sinon';
import { shallow } from 'enzyme';
import Switch from './Switch';


describe("<Switch />", () => {
  it('should render the Switch component', () => {
    const wrapper = shallow(
        <Switch />
    );
    expect(wrapper.find(".slider")).toHaveLength(1);
  });

  it('simulates change events', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<Switch onChange={onChange} />);
    wrapper.find('input').simulate('change');
    expect(onChange).toHaveProperty('callCount', 1);
  })
});
