import { Component } from '@angular/core';
import { User } from '../user.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  selectedUser: any;
  userRef: AngularFireList<User>; // Firebase와 CRUD 작업에 따른 데이터 동기화에 사용하는 멤버
  users: Observable<any[]>; // 출력 Observable 멤버
  updateMode: boolean;

  constructor(db: AngularFireDatabase) {
    this.userRef = db.list<User>('users');
    this.users = this.userRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() } ))
        )
      );
    this.updateMode = false;
  }

  onSelect(user: User): void {
    this.updateMode = true;
    this.selectedUser = user;
  }

  setAddMode(): void {
    this.updateMode = false;
    this.selectedUser = new User();
  }

  addUser(): void {
    if (!this.selectedUser) {
      return;
    }
    if (!this.selectedUser.name || this.selectedUser.age < 1) {
      alert('올바른 사용자 정보를 입력해주세요.');
      return;
    }
    this.userRef.push(this.selectedUser);
  }

  updateUser(key: string): void {
    if (!this.selectedUser) {
      return;
    }
    const user = new User();
    user.name = this.selectedUser.name;
    user.age = this.selectedUser.age;
    this.userRef.update(key, user);
  }

  deleteUser(id: string): void {
    if (!id) {
      return;
    }
    this.userRef.remove(id);
    this.selectedUser = undefined;
  }
}
