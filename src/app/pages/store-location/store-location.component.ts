import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocationsService } from '../../shared/services/locations.service';
import { DeviceInfoService } from '../../core/services/device-info.service';
import { FinderInputComponent } from '../../shared/components/finder-input/finder-input.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-store-location',
  imports: [FinderInputComponent, LoadingComponent],
  templateUrl: './store-location.component.html',
  styleUrl: './store-location.component.css'
})
export class StoreLocationComponent implements OnInit {
  private latitude: number = 0;
  private longitude: number = 0;
  private visitorId: string = '';
  public isLoading: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private locationService: LocationsService,
    private deviceInfoService: DeviceInfoService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((leafletModule) => {
        const L = leafletModule.default;  // Accede a la propiedad default
        this.getLocationPosition(L);
      }).catch(err => {
        console.error('Error al cargar Leaflet:', err);
        this.isLoading = false;  // Detiene el loading en caso de error
      });
    }

    this.visitorId = this.deviceInfoService.getVisitorId();
    console.log('visitorId:', this.visitorId);
  }

  getLocationPosition(leaflet: any): void {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
    }).catch(err => {
      console.error('Error al obtener la posición:', err);
    }).finally(() => {
      if (this.latitude && this.longitude) {
        this.loadConfigMap(leaflet);
      } else {
        console.warn('Posición no válida.');
      }
      this.isLoading = false;
    });
  }

  loadConfigMap(leaflet: any): void {
    try {
      const map = leaflet.map('map').setView([this.latitude, this.longitude], 13);

      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      leaflet.marker([this.latitude, this.longitude]).addTo(map)
        .bindPopup('Disfrutas desde este lugar')
        .openPopup();
    } catch (error) {
      console.error('Error al configurar el mapa:', error);
    }
  }
}
