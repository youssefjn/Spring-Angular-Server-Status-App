import { Status } from "../enum/status.enum";

export interface Server {
  status: Status;
     id : number;
    ipAddress:string;
     name:string;
     memory:string;
     type:string;
     imageUrl:string;
     Status:Status;

}