import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';
import { Observable } from 'rxjs';
import { CommonUtility } from '../shared/common-utility';
import { Http, RequestOptions, RequestMethod, Headers, Jsonp } from '@angular/http';
import { ApiResponse } from '../models/api-response';
import { Participant } from '../models/participant';

@Injectable()
export class UserAccountService {


  constructor(private http: Http) { }

  public getUsers(): Observable<UserAccount[]> {

    return this.http.get(CommonUtility.baseApiUrl + 'UserAccount/Users')
      .map(res => res.json())
      .catch(CommonUtility.handleError);
  }
  public getUserById(id: number): Observable<UserAccount> {

    return this.http.get(CommonUtility.baseApiUrl + `UserAccount/UserById/${id}`)
      .map(res => res.json())
      .catch(CommonUtility.handleError);
  }
  public createUser(user): Observable<ApiResponse<boolean>> {

    const options = CommonUtility.getRequestOptions();
    return this.http.post(CommonUtility.baseApiUrl + 'UserAccount/CreateUser', JSON.stringify(user), options)
      .map(res => res.json())
      .catch(CommonUtility.handleError);
  }

  public activeOrDeactiveUserAccount(userId: number, isActive: boolean) {
    const options = CommonUtility.getRequestOptions();

    return this.http.put(CommonUtility.baseApiUrl + `UserAccount/ActiveOrDeactiveUserAccount/${userId}/${isActive}`, options)
      .map(res => res.json())
      .catch(CommonUtility.handleError);

  }

  updateProfile(fileToUpload: FormData, profile: UserAccount): Observable<ApiResponse<UserAccount>> {
    let headers = new Headers()

    let options = new RequestOptions({ headers: headers, params: { "Profile": profile } });

    return this.http.post(CommonUtility.baseApiUrl + 'UserAccount/UpdateProfile', fileToUpload, options)
      .map(res => res.json())
      .catch(CommonUtility.handleError);
  }

  changePassword(changePassword):Observable<ApiResponse<boolean>> 
  {
    const options = CommonUtility.getRequestOptions();

    return this.http.put(CommonUtility.baseApiUrl+'UserAccount/ChangePassword',changePassword,options)
          .map(res=>res.json())
          .catch(err=>CommonUtility.handleError(err));
  }

}
