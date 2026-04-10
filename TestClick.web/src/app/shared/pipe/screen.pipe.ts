import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'screenStatus', standalone: true })
export class ScreenStatusPipe implements PipeTransform {
  private readonly map: Record<number, string> = {
    1: 'Active',
    2: 'Inactive'
  };

  transform(value: number): string {
    return this.map[value] ?? 'Unknown';
  }
}

@Pipe({ name: 'screenType', standalone: true })
export class ScreenTypePipe implements PipeTransform {
  private readonly map: Record<number, string> = {
    1: 'Billboard',
    2: 'Street furniture',
    3: 'Transit display',
    4: 'Digital poster',
  };

  transform(value: number): string {
    return this.map[value] ?? 'Unknown';
  }
}

@Pipe({ name: 'placementType', standalone: true })
export class PlacementTypePipe implements PipeTransform {
  private readonly map: Record<number, string> = {
    1: 'Roadside',
    2: 'Mall',
    3: 'Airport',
    4: 'Transit station',
    5: 'Stadium',
  };

  transform(value: number): string {
    return this.map[value] ?? 'Unknown';
  }
}
