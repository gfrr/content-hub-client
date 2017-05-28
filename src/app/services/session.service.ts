import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import jwtDecode from 'jwt-decode';




@Injectable()
export class SessionService implements CanActivate {
  public token: string;
  public isAuth: boolean;
  public user: string;
  public id: string;

	BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) {
      // set token if saved in local storage
      this.token = localStorage.getItem('token');
      if (this.token != null) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      this.token  = localStorage.getItem('token');
      console.log(jwtDecode(this.token));
      this.user   = jwtDecode(this.token).user;
      this.id = jwtDecode(this.token).id;
      this.isAuth = true;
      return true;
    }
    this.router.navigate(['/login']);
    this.isAuth = false;
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  signup(user) {
  	return this.http.post(`${this.BASE_URL}/signup`, user)
  		.map((response) => response.json())
  		.map((response) => {
  			let token = response.token;
  			const user = response.user;
  			if (token) {
          // set token property
          this.token = token;
          this.user = jwtDecode(token).user;
          console.log(jwtDecode(this.token));
          this.id = jwtDecode(this.token).id;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          this.isAuth = true;
          // return true to indicate successful login
          return true;
        } else return false; // return false to indicate failed login
  		})
  		.catch((err) => Observable.throw(err));
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            let user = response.json() && response.json().user;
            if (token) {
              // set token property
              this.token = token;
              this.user = jwtDecode(token).user;
              console.log(jwtDecode(this.token));
              this.id = jwtDecode(this.token).id;
              this.isAuth = true;
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', token );
              localStorage.setItem('user', JSON.stringify(user) );
              // return true to indicate successful login
              return true;
            } else return false;   // return false to indicate failed login
        });
  }

  save(data){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });

    let options = new RequestOptions({ headers: headers });
    console.log(options);
    return this.http.post(`${this.BASE_URL}/users/${this.id}/save`, data, options)
      .map((res: Response) => {
          let user = res.json() && res.json().user;
          localStorage.setItem('user', JSON.stringify(user));
          return true;
      });
  }

  getSearches(){
    console.log(JSON.parse(localStorage.user).searches);
    return JSON.parse(localStorage.user).searches;
  }


  getFavorites(){
    console.log(JSON.parse(localStorage.user).favorites);
    return JSON.parse(localStorage.user).favorites;
  }


  delete() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    let options = new RequestOptions({ headers: headers});

    return this.http.delete(`${this.BASE_URL}/users/${this.id}`, options)
      .map((res) => res.json());
  }


  logout() {
      this.token = null;
      this.user = null;
      this.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
  }

  getFavorite(id){
    return this.http.get(`${this.BASE_URL}/search/${id}`)
      .map((res: Response)=>{
        return res.json();
      })
  }

  //search queries, this is gonna go in another service as soon as i'm finished

  getTags(){
    return this.http.get(`${this.BASE_URL}/search/trends`)
      .map((res: Response)=>{
        return res.json();
      })
  }

 getPopular(){
   return this.http.get(`${this.BASE_URL}/search/popular`)
    .map((res: Response)=>{
      return res.json();
    })
 }

 saveSearch(query){
   let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
   let options = new RequestOptions({ headers: headers});
   return this.http.patch(`${this.BASE_URL}/users/${this.id}`, query, options)
        .map((res: Response)=>{
          let user = res.json() && res.json().user;
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        })
 }

  searchYoutube(query){
    return this.http.post(`${this.BASE_URL}/search/youtube`, query)
        .map((response: Response)=>{
           return response.json();
        });
  }
  searchTwitter(query){
    return this.http.post(`${this.BASE_URL}/search/twitter`, query)
        .map((response: Response)=>{
           return response.json();
        });
  }

  searchReddit(query){
    return this.http.post(`${this.BASE_URL}/search/reddit`, query)
      .map((response: Response)=>{
        return response.json();
      });
  }

  searchTumblr(query){
    return this.http.post(`${this.BASE_URL}/search/tumblr`, query)
      .map((response: Response)=>{
        return response.json();
      });
  }


}
