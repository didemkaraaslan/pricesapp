export class User {
    private id: string;
    private name: string;
    private email: string;
    private gender: string;
    private isAdmin = false;


    constructor(id: string, name: string, email: string, gender: string ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gender = gender;

    }

    setId(id: string) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
}
