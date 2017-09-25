import React from 'react'
import Navigation from '../Navigation'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

describe('Testing Navigation', () => {
  it('Render nav with auth', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={['/login']}>
          <Navigation auth={true} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Render nav without auth', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={['/login']}>
          <Navigation auth={false} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Has three links', () => {
    const wrapper = shallow(<Navigation auth={true} />)
    expect(wrapper.find(Link).length).toBe(2)
  })

  it('Simulate Click', () => {
    const wrapper = shallow(<Navigation auth={true} />)
    wrapper
      .find(Menu)
      .last()
      .simulate('click')
  })
})
