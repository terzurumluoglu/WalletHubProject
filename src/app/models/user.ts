export class User{
    id: number;
    name: string;
    email: string;
    password: string;
    constructor(id : number,name : string,email : string,password : string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class UsersList{
    private _users: User[] = [
        new User(1,'Toprak','toprak@toprak.com','1.Toprak'),
        new User(2,'Test','test@test.com','1.Toprak')
    ];
    public getAllUsers() : User[] {
        return this._users;
    }
    public getUser(email : string,password : string): User{
        return this._users.find(p => p.email == email && p.password == password) as User;
    }
}