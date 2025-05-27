export type InputFieldType =
  | "resturantName"
  | "sanwichName"
  | "introduction"
  | "remarks";

export type InputFieldProps = {
  type: InputFieldType;
  text: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};
