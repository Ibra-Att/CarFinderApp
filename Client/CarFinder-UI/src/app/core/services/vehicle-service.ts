import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}`;

  getMakes() {
    return this.http.get(`${this.base}/vehicles/makes`);
  }

  getVehicleTypes(makeId: number){
    return this.http.get(`${this.base}/vehicles/makes/${makeId}/vehicle-types`);
  }

  getModels(makeId: number, year: number){
    return this.http.get(`${this.base}/vehicles/makes/${makeId}/models`, {
      params: { year: String(year) }
    });
  }

}
