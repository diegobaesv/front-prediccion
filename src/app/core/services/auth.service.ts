import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private clientId: string = '37679064495-uld3q9730hfldk8tbs2ue7viaj3kt0st.apps.googleusercontent.com';
    private scope: string = 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read';


    constructor() {
    }

    public getPathGoogleAuth(): string {
        let urlGoogle = 'https://accounts.google.com/o/oauth2/v2/auth';
        const params = {
            client_id: this.clientId,
            scope: this.scope,
            //plugin_name: 'hello',
            include_granted_scopes: 'true',
            //ux_mode: 'redirect',
            redirect_uri: 'http://localhost:4200/app/auth-callback',
            response_type: 'token',
            state: 'state_parameter_passthrough_value'
        }
        let queryParams: string = Object.entries(params).map((param: any) => {
            return `${param[0]}=${encodeURI(param[1])}`
        }).join('&');

        return `${urlGoogle}?${queryParams}`;
    }





    /*public getFitnessData(accessToken: string): Promise<any> {
      return fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "aggregateBy": [{
            "dataTypeName": "com.google.step_count.delta",
            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
          }],
          "bucketByTime": { "durationMillis": 86400000 },
          "startTimeMillis": 1585699200000, // Start time in milliseconds
          "endTimeMillis": 1585785600000    // End time in milliseconds
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching fitness data:', error);
        throw error;
      });
    }*/
}
