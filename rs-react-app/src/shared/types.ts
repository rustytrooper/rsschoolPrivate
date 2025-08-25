type FileMetadata = {
  name: string;
  size: number;
};

export type FormFields = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  terms: boolean;
  file?: FileMetadata;
};
