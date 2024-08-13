export default interface ICoupon {
  _id: string;
  title: string;
  description: string;
  valid_from: Date;
  valid_until: Date;
  terms: string;
  status: string;
  created_at: Date;
  validated_by: string;
  is_valid_at: Array<string>;
  redeemed_at: Date;
  created_by: string;
  redeemed_date: Date;
  event: string;
  is_selected?: boolean;
}
