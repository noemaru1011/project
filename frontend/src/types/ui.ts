export type ButtonVariant =
  | "Create"
  | "Read"
  | "Update"
  | "Delete"
  | "Search"
  | "Login"
  | "Back";

export type InputType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "password"
  | "url"
  | "date";

export type Option = {
  value: string;
  label: string;
};
