import { Observable } from 'rxjs';

export interface UserActive {
  date: string;
  pagesVisitCount: number;
  deltaUp: boolean;
  newVisits: number;
}
export interface ActivityAction {
  date: Date;
  Age: number;
  Interaction: boolean;
  Sexe: boolean;
}

export abstract class UserActivityData {
  abstract getUserActivityData(period: string): Observable<ActivityAction[]>;

}

