import {configureStore} from "@reduxjs/toolkit";

import usersSlice from "./reducers/usersSlice";
import authSlice from "./reducers/authSlice";
import settingSlice from "./reducers/settingSlice";
import messageSlice from "./reducers/messageSlice";
import bannerSlice from "./reducers/bannerSlice";

const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
        banner: bannerSlice.reducer,
        auth: authSlice.reducer,
        setting: settingSlice.reducer,
        message: messageSlice.reducer,
    },

});

export default store;
