import { Status } from "../enum/status.enum";
import { Server } from "./server";

export interface Response{
     timeStamp : Date;
      statusCode  : number;
     status : string ;
      reason:string;
      message:string;
      developerMessage:string;
    data:{servers?:Server[],server?: Server};
}