export interface Material {
    id: string;
    owner: string;
    status: 'available' | 'unavailable'; // assuming status could have multiple values
    quantity: string; // or number if you want to parse it as a number
  }
  