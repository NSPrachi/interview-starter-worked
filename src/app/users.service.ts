import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_state/users/users-store';
import { map } from 'rxjs/operators';
import { UsersEffects } from './_state/users/users-effects';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<User[]>('https://dummyjson.com/users?limit=100')
    .pipe(map((data: any) => {
      console.log(typeof(data));
      const users : User[] = [];
      
      for (let x in data) {
        //users.push({...data[x as keyof typeof data]});
        if(x == "users"){
        users.push(...data[x as keyof typeof data]);
        type T = keyof typeof data;
        }
      }
      console.log('get Users API :',users);      console.log(users)
      return users;
    }));
  }

  update(userid: string | number,changes: Partial<User>) {
    console.log('Update User API :',userid,changes);
    return this.http.put(
      'https://dummyjson.com/users/'+ userid, changes
    );
  }
}
