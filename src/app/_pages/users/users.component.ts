import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UsersActions, selectUsers} from '../../_state/users/users-store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule,MatIcon } from '@angular/material/icon';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatProgressSpinnerModule,MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule,MatTableModule,MatPaginatorModule,MatIconModule,MatProgressSpinnerModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users$ : Observable<any>;
  Object = Object;
  public hideRuleContent:boolean[] = [];
  onsaving : boolean = false;
  userForm: User = {
    id: '',
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    birthDate: ''
  };
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'maidenName', 'age', 'gender', 'email', 'phone', 'birthDate'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: User;
  public dataSource : MatTableDataSource<User>;
  customerTotal: number = 0;
  noData: User[] = [<User>{}];
  loading: boolean = false;
  selectedUser:any;
  userToBeUpdated:User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private readonly store: Store, private router: Router){
    this.users$ = this.store.pipe(select(selectUsers));
    //this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(){
    this.loading = true;
    this.users$.subscribe(users => {
      console.log('jhhg');
      console.log(users.users);
      this.loading = users.loading;
      this.initializeData(users.users)
    })
    this.store.dispatch(UsersActions.init());
  }


  initializeData(users: User[]): void {
    this.dataSource = new MatTableDataSource(users.length ? users : this.noData);
    console.log('dddsaaaa');
    console.log(this.dataSource);

    setTimeout(() =>{ console.log(this.paginator); this.dataSource.paginator = this.paginator; });
  }

  

  ngAfterViewInit() {
    
  }

  onEdit(user: User){
    console.log('onedit',user);
    this.userToBeUpdated = user;
    this.hideRuleContent[+user.id] = !this.hideRuleContent[+user.id];
  }

  onEditUpdate(expandedElement: NgForm){ 
    console.log('ddd',expandedElement.form.value);   
    const update: Update<User> = {
      id: this.userToBeUpdated.id,
      changes: {
        ...this.userToBeUpdated,
        ...expandedElement.form.value
      }
    };

    this.store.dispatch(UsersActions.updateUser({update}));
    let apiStatus$ = this.store.pipe(select(selectUsers));
    apiStatus$.subscribe((apState) => {
      console.log(apState);
      this.router.navigate(['/']);
    });
    this.hideRuleContent[+this.userToBeUpdated.id] = !this.hideRuleContent[+this.userToBeUpdated.id];
    //this.userToBeUpdated = userForm;
  }

  onSave() {
    this.onsaving = true;
    // this.store.dispatch(
    //   UsersActions.updateUserApiSucess({ updateUser: { ...this.userForm } })
    // );
    // let apiStatus$ = this.appStore.pipe(select(selectAppState));
    // apiStatus$.subscribe((apState) => {
    //   if (apState.apiStatus == 'success') {
    //     this.appStore.dispatch(
    //       setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
    //     );
    //     this.router.navigate(['/']);
    //   }
    // });
  }
}
