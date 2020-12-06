import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse  } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError, retry } from 'rxjs/operators';
import { Jrepackageresponse } from "../util/jrepackageresponse";
import { Jreconstants } from "../util/jreconstants";

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  constructor(private http: HttpClient) { 

  }

  /**
   * Method for for retriving all JRE's
   * 
   */
  getAllJre(): Observable<any> {
    return this.http.get(Jreconstants.GET_ALL_JRE_API_URL);
  }

  /**
   * Method for search JRE
   * param- searchkey
   */
  getJreBySearch(searchkey) : Observable<any> {
    return this.http.get(Jreconstants.SEARCH_API_URL+searchkey);  
  }

  /**
   * Method for download existing JRE's
   * param- jrename
   */
  download(jrename) : Observable<any>{
    return this.http.get(Jreconstants.DOWNLOAD_API_URL+jrename, {
      responseType: 'blob',
      observe: 'response'
    })
    .pipe(
      map((res: any) => {
        return new Blob([res.body], { type: `${Jreconstants.RETURN_TYPE}`});
      })
    );
  }

  /**
   * Retrieve all customer from Backend
   */
  getPagableJREPackages(pageNumber: number, 
                        pageSize: number, salary: number,
                        agesorting: boolean, desc: boolean): Observable<Jrepackageresponse> {
    // Initialize Params Object
    let params = new HttpParams();
    // Begin assigning parameters
    params = params.append(Jreconstants.PAGE, pageNumber.toString());
    params = params.append(Jreconstants.SIZE, pageSize.toString());
    return this.http.get<Jrepackageresponse>(Jreconstants.GET_ALL_JREPACKAGE_API_URL, { params: params })
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
  }

  /**
   * method for creating new JRE
   * param-list of jre packages
   */
  buildJRE(jrePackage) : Observable<any>{
    return this.http.post(Jreconstants.BUILD_API_URL,jrePackage, {
      responseType: 'blob',
      observe: 'response'
    })
    .pipe(
      map((res: any) => {
        console.log("--"+res)
        return new Blob([res.body], { type: Jreconstants.RESPONSE_TYPE});

      })
    );
  }


  /**
   * method for handiling error 
   * param-HttpErrorResponse
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
