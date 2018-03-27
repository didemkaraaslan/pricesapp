export class User {
    private name: string;
    private email: string;
    private password: string;
    private passwordConfirm: string;
    private gender: string;
    private isAdmin = false;


    constructor(name: string, email: string, password: string, passwordConfirm: string, gender: string ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.gender = gender;

    }
}
