import React from 'react';
import {Redirect, Route} from "react-router-dom";

function AlreadyAuthRoute({ authenticated, component: Component, render, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                ) : (
                    render ? (
                        render(props)
                    ) : (
                        <Component {...props} />
                    )
                )
            }
        />
    );
}

export default AlreadyAuthRoute;