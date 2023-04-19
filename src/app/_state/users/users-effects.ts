import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from '../../users.service';
import { Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom,exhaustMap, concat, catchError,concatMap } from 'rxjs';
import { UsersActions }  from '../../_state/users/users-store';

@Injectable()
export class UsersEffects {
    //actions$ = inject(Actions);

    constructor(private actions$: Actions,private usersService: UsersService,
        private store: Store){

    }

    selectUsers$ = createEffect(()=> { 
        return this.actions$.pipe(
            ofType(UsersActions.init),
            exhaustMap(() => this.usersService.get()
                .pipe(
                    map((users)=>UsersActions.saveInitialUsers({users}))
                )            
            )
        )
    })

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
        ofType(UsersActions.updateUser),
        concatMap((action) => { console.log('action',action); return this.usersService.update(action.update.id, action.update.changes);})
        ),
        {dispatch: false}
    );
}