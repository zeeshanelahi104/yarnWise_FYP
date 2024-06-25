
export interface RolePermissions {
  user: string[];
  role: string[];
  inventory: string[];
  transaction: string[];
  broker: string[];
  party: string[];
  report: string[];
  dashboard: string[];
}
export interface UserTypes {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    permissions: RolePermissions;
    address: string;
    phoneNumber: string;
  }
  export interface Inventory {
    _id?:string;
    name: string;
    brand: string;
    count: string;
    stock: number;
  }
  export interface Transaction {
    _id?:string;
    productName: string;
    productCount: string;
    brandName: string;
    unitPrice: number;
    quantity: number;
    totalBill: number;
    partyName: string;
    partyArea: string;
    brokerName: string;
    brokerCommissionPercentage: number;
    transactionType: string;
    debit: number;
    credit: number;
    balance: number;
    status: string;
    createdAt:string;
  }
  export interface Role {
    _id?:string;
    role: string;
    permissions: RolePermissions;
  }
 
  export interface Broker {
    _id?:string;
    name: string;
    address: string;
    contactNumber: string;
    brokerCommision: number;
  }
 
  export interface Party {
    _id?:string;
    partyName: string;
    ownerName: string;
    partyArea: string;
    address: string;
    contactNumber: string;
    balance: number;
    status: string;
  }
 
  export interface Response {
    data?: [];
    status?:number;
    message?: string;
    success?: boolean
  }

  export interface SessionTypes {
    data: {
      user: UserTypes | null;
    };
    status: "authenticated" | "loading" | "unauthenticated";
  }
  