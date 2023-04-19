import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createReducer, emptyProps, props, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { map } from 'rxjs';
import {Update} from '@ngrx/entity';
const UsersStoreKey = "users";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
}

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
    error: boolean,
    loading: boolean
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null,
    error: false,
    loading: true
});

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
        'Inovke update user api':props<{ updateUser: User }>(),
        'Update User':props<{ update: Update<User> }>(),
        'Update User Success':props<{ user: User }>()
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions.init, (state) => ({
            ...state,
            error:false,
            loading: true,
        })),
        on(UsersActions.saveInitialUsers, (state, { users }) => ({
            ...state,
            error:false,            
            loading: false,
            users
        })),
        on(UsersActions.updateUser, (state, action) => {
            return usersAdapter.updateOne(action.update, state);
        })
        
    )
});

export const selectUsersState = createFeatureSelector<User>(
    UsersStoreKey
);

export const selectUsers = createSelector(
    selectUsersState,
    (state) => state
);
export const selectLoading = createSelector(
selectUsersState,
(state) => state
);

export const selectUserListPageViewModel = createSelector(
    selectUsers,
    selectLoading,
    (users, loading) => ({ users, loading })
);

