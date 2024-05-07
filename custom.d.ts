import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            verifiedToken: string;
        }
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
        SECRET_KEY: string;
        // Add more environment variables here if needed
    }
}

export declare namespace SignUpNameSpace {

    interface UniqueDataType {
        mobileNumber?: string,
    }
  
    interface Err {
       err: unknown;
     }

    interface Register {
      first_name: string;
      last_name: string;
      password: string;
      contact_number: string;
      email?: string;
      role?: string;
    }

    interface Login_Response{
         success: boolean; 
         token: Text;
          refreshToken: Text;
         }

}





