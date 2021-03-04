import React from "react";
import {useAppContext} from "../providers/ApplicationProvider";
import AccessDenied from "./AccessDenied";

const requireLogin = (WrappedComponent) => (props) => {
    const [{accessToken}] = useAppContext();
    if (accessToken === null)
    {
        return <AccessDenied />;
    }
    else
    {
        return(
            <WrappedComponent {...props}>
            {props.children}
            </WrappedComponent>
        );
    }
}

export default requireLogin;