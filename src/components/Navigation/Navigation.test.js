import React from 'react'
import Navigation from './Navigation'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

it('renders corectly', () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[ '/login' ]}>
            <Navigation auth={true} />
        </MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()
})