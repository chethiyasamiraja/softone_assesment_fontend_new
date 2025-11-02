export interface Task {
  id?: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdDate: Date;
  dueDate: Date | null;
}
 
export interface Responses<T> {
  succeeded: boolean;
  message: string;
  data: T | null;
  errors: string[] | null;
  ResponseCode: number;


}


export interface LoginResponse {
  isValid: boolean;
  message: string;
  responseCode: number;
}

