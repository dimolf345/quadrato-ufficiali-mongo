export interface IFondo {
  _id: string;
  saldo: number;
  ultimi_movimenti: Array<Object>
  createdAt: Date
  updatedAt: Date
}