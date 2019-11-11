import { observable, action } from "mobx";


export class ConnectStore {
    @observable
    public isAuthenticated: boolean = false

    @action
    authenticated = () => {
        this.isAuthenticated = true
    }

}