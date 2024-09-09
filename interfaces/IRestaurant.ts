export default interface IRestaurant {
  _id: string;
  name: string;
  code: number;
  franchise: string;
  has_breakfast: boolean;
  address: string;
  city: string;
  province: string;
  created_at: Date;
  updated_at: Date;
  active: boolean;
  employees: Array<any>;
}
