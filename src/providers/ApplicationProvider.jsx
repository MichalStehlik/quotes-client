import { createContext, useReducer, useContext } from "react";

const initialState = {accessToken: null};

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN: {
            return {...state, accessToken: action.payload};
        }
        default: {
            return state;
        }
    }
}

export const AppContext = createContext();
export const AppProvider = ({children, ...rest}) => {
    const [store, dispatch] = useReducer(appReducer, initialState);   
    return (
        <AppContext.Provider value={[store, dispatch]}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);