// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html
import { AsyncStorage } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

// reducers

import {AuthReducer,AllActionReducer, } from './reducer/index';

















// epics

import { AuthEpic,AllActionEpic} from './epic/index';// eslint-disable-next-line
import { AuthAction } from './action';





// Application Epics / Effects
const persistConfig = {
    key: 'root',
    storage,
}

const rootEpic = combineEpics(
    AuthEpic.login,
    AuthEpic.Signup,
    AuthEpic.SetUserData,
    
    // AuthEpic.getUserDetail,
    // AuthEpic.changePass,
    // AuthEpic.themeTemplate,
    

    AllActionEpic.insertCompany,
    AllActionEpic.getCompany,

    AllActionEpic.updateCompany,
    AllActionEpic.getAllCompany,
    AllActionEpic.insertDriver,
    AllActionEpic.SignupDriver,
    AllActionEpic.getDriverRequsetsList,
    AllActionEpic.updateDriver,
    AllActionEpic.insertAdminDriver,
    AllActionEpic.getDriversList,
    AllActionEpic.insertProducts,
    AllActionEpic.getProductsList,
    AllActionEpic.insertTermsConditions,
    AllActionEpic.GetTermsAndCondition,
    AllActionEpic.insertCategories,
    // AllActionEpic.SupplierLookup,
    // AllActionEpic.StoreTypeLookup,
    // AllActionEpic.getItemsLookup,
);

// Application Reducers
const rootReducer = combineReducers({
    AuthReducer,
    
    AllActionReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)
const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
// epicMiddleware.run(rootEpic);

export let store = createStoreWithMiddleware(persistedReducer);
export let persistor = persistStore(store, { storage: AsyncStorage })
// Export Actions
export * from './action/index';