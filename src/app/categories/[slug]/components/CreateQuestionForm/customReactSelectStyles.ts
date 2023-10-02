import { StylesConfig } from "react-select";
import { CategorySelectOption } from "@/app/categories/[slug]/components/CreateQuestionForm/utils";

const selectStyles: StylesConfig<CategorySelectOption, true> = {
  control: (base) => {
    return {
      ...base,
      backgroundColor: "#202020",
      border: "none",
      minWidth: "300px",
      maxWidth: "25vw",
    };
  },

  menu: (base) => {
    return { ...base, backgroundColor: "#202020", border: "none" };
  },

  option: (base) => {
    return {
      ...base,
      backgroundColor: "#202020",
      border: "none",
      ":hover": { backgroundColor: "#3d3b3b" },
    };
  },

  multiValue: (base, state) => {
    return state.data.isFixed
      ? { ...base, backgroundColor: "black" }
      : { ...base, backgroundColor: "#3d3b3b", color: "black" };
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : { ...base, color: "white" };
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed
      ? { ...base, display: "none" }
      : { ...base, color: "white" };
  },
};

export default selectStyles;
