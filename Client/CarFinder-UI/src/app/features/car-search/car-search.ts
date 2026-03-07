import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { VehicleService } from '../../core/services/vehicle-service';
import { CarModel } from '../../models/carModel';
import { Make } from '../../models/make';
import { VehicleType } from '../../models/vehicleType';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-search',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './car-search.html',
  styleUrl: './car-search.scss',
})
export class CarSearch implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly snackBar = inject(MatSnackBar);


  makes = signal<Make[]>([]);
  vehicleTypes = signal<VehicleType[]>([]);
  models = signal<CarModel[]>([]);

  selectedMake = signal<Make | null>(null);
  selectedYear = signal<number | null>(null);

  makeSearchText = signal('');
  makeSearchControl = new FormControl('');

  filteredMakes = computed(() => {
    const search = this.makeSearchText().toLowerCase();
    const allMakes = this.makes();
    if (!search) return allMakes;
    return allMakes
      .filter(m => m.makeName.toLowerCase().includes(search) || m.makeId.toString().includes(search));
  });

  years: number[] = [];

  ngOnInit(): void {
    this.generateYears();
    this.getAllMakes();
    this.makeSearchControl.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.makeSearchText.set(value);
        if (this.selectedMake()) {
          this.selectedMake.set(null);
          this.vehicleTypes.set([]);
          this.models.set([]);
        }
      }
    });
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear + 1; y >= 1960; y--) {
      this.years.push(y);
    }
  }

  getAllMakes(): void {
    this.vehicleService.getMakes().subscribe({
      next: (response) => this.makes.set(response.results),
      error: (error) => {
        console.error('Failed to load makes:', error);
        this.snackBar.open('Failed to load makes', 'Close', { duration: 3000 });
      },
    });
  }

  displayMake = (value: Make | string): string => {
    if (!value) return '';
    return typeof value === 'string' ? value : value.makeName;
  };

  onMakeSelected(make: Make): void {
    this.selectedMake.set(make);
    this.vehicleTypes.set([]);
    this.models.set([]);

    this.vehicleService.getVehicleTypes(make.makeId).subscribe({
      next: (response) => this.vehicleTypes.set(response.results),
      error: (error) => {
        console.error('Failed to load vehicle types:', error);
        this.snackBar.open('Failed to load vehicle types', 'Close', { duration: 3000 });
      },
    });

    if (this.selectedYear()) {
      this.loadModels();
    }
  }

  onYearSelected(year: number): void {
    this.selectedYear.set(year);
    this.models.set([]);

    if (this.selectedMake()) {
      this.loadModels();
    }
  }

  private loadModels(): void {
    const make = this.selectedMake();
    const year = this.selectedYear();
    if (!make || !year) return;

    this.vehicleService.getModels(make.makeId, year).subscribe({
      next: (response) => this.models.set(response.results),
      error: (error) => {
        console.error('Failed to load models:', error);
        this.snackBar.open('Failed to load models', 'Close', { duration: 3000 });
      },
    });
  }
}