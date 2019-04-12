export class Task {
  id: number;
  type: string;
  client: string;
  availableDay: Array<string>;
  availableTime: Array<string>;
  retailer: string;
  pickupList: [];
  completed: boolean;
}
