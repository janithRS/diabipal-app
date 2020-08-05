import { Injectable } from "@angular/core";

interface user {
  username: string;
  uid: string;
}

@Injectable({
  providedIn: "root",
})

export class UsersService {
  constructor() {}

  private user: user;

  setUser(user: user) {
    this.user = user;
  }

  getUID() {
    return this.user.uid;
  }
}
