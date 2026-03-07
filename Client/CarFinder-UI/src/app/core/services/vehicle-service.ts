import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NhtsaResponse } from '../../models/nhtsaResponse';
import { Make } from '../../models/make';
import { VehicleType } from '../../models/vehicleType';
import { CarModel } from '../../models/carModel';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}`;

  getMakes() {
    return this.http.get<NhtsaResponse<Make>>(`${this.base}/vehicles/makes`);
  }

  getVehicleTypes(makeId: number) {
    return this.http.get<NhtsaResponse<VehicleType>>(`${this.base}/vehicles/makes/${makeId}/vehicle-types`);
  }

  getModels(makeId: number, year: number) {
    return this.http.get<NhtsaResponse<CarModel>>(`${this.base}/vehicles/makes/${makeId}/models`, {
      params: { year: String(year) }
    });
  }
}
