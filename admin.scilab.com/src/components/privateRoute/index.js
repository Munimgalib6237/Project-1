
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticate } from '../../utils/authenticate'

const PrivateRoute = ({ props, children, ...rest }) => {
    const loggedIn = isAuthenticate()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: "/",
                            from: location
                        }}
                    />
            }
        />
    )
}

export default PrivateRoute;