export class Contact {
    constructor(firstname, lastname, email, message) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.message = message;
    }

    isValidContact() {
        return this.firstname && this.lastname && this.email && this.message;
    }
}