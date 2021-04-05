import { Injectable } from "@angular-core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

const RESOURCE_URL = 'api'

@Injectable({
    providedIn: 'root'
})

export class UserRoleCrudResourceService {
    constructor(private httpClient: HttpClient){

    }

    findAll(): Observable<UserRole[]>{
       return this.httpClient.get<UserRole[]> (RESOURCE_URL)
    }
}