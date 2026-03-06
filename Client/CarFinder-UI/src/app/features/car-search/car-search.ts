import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle-service';
import { CarModel } from '../../models/carModel';
import { Make } from '../../models/make';
import { VehicleType } from '../../models/vehicleType';

@Component({
  selector: 'app-car-search',
  imports: [],
  templateUrl: './car-search.html',
  styleUrl: './car-search.scss',
})
export class CarSearch implements OnInit {
  private readonly vehicleService = inject(VehicleService);

  makes = signal<Make[]>([]);
  vehicleTypes = signal<VehicleType[]>([]);
  models = signal<CarModel[]>([]);

  selectedMake = signal<Make | null>(null);
  selectedYear = signal<number | null>(null);

  // loadingMakes = signal(false);
  // loadingTypes = signal(false);
  // loadingModels = signal(false);
  // error = signal<string | null>(null);



  ngOnInit(): void {
    this.getAllMakes();
    
  }
  getAllMakes() {
    this.vehicleService.getMakes().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }

  getVechicleTypesByMakeId(makeId: number) {
    this.vehicleService.getVehicleTypes(makeId).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }


  getModelsByMakeIdAndYear(makeId: number, year: number) {
    this.vehicleService.getModels(makeId, year).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
  
  }