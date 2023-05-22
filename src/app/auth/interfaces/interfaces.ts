

export interface AuthResponce{
  ok: boolean;
  uid?: string;
  token?:string;
  msg?:string;
  nombre?:string;
  email?: string;
}


export interface Usuario{
  uid: string;
  nombre:string;
  email:string;
}
