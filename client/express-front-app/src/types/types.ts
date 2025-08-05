export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  bio?: string;
  hobbies?: string[];
  skills?: string[];
  image?: string;
}
