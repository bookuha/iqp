import * as yup from "yup";

export const schema = yup
  .object({
    title: yup
      .string()
      .min(
        4,
        "The description provided is too short." +
          " Please make sure your description is at least 16 characters long and try again. (maximum 30)"
      )
      .max(
        30,
        "The description provided is too long." +
          " Please make sure your description is no more than 30 characters long and try again."
      )
      .required("This field is required."),
    description: yup
      .string()
      .min(
        16,
        "The description provided is too short." +
          " Please make sure your description is at least 16 characters long and try again. (maximum 64)"
      )
      .max(
        64,
        "The description provided is too long." +
          " Please make sure your description is no more than 64 characters long and try again."
      )
      .required("This field is required."),
    categories: yup
      .array()
      .max(3, "You can only select up to 3 categories.")
      .required(),
  })
  .required();

export interface QuestionFormFields {
  title: string;
  description: string;
  categories: CategorySelectOption[];
}

export interface CategorySelectOption {
  value: string;
  label: string;
  isFixed: boolean;
}
