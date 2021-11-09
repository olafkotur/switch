import {
  configureStore,
  createSerializableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import userReducer from './redux/user';
import interfaceReducer from './redux/interface';

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: () => true,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
  },
  middleware: [serializableMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch;
