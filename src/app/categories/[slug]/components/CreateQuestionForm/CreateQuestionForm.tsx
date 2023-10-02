"use client";

import styles from "./create-question-form.module.css";
import { Control, Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from ".prisma/client";
import AsyncSelect from "react-select/async";
import { ActionMeta, OnChangeValue } from "react-select";
import {
  schema,
  CategorySelectOption,
  QuestionFormFields,
} from "@/app/categories/[slug]/components/CreateQuestionForm/utils";
import selectStyles from "@/app/categories/[slug]/components/CreateQuestionForm/customReactSelectStyles";
import { usePathname } from "next/navigation";

const orderOptions = (values: readonly CategorySelectOption[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

export const CreateQuestionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedOptions, setSelectedOptions] = useState<
    CategorySelectOption[]
  >([]);

  // Get route slug
  const routeSlug = usePathname().split("/").at(-1);

  const getOptions = (
    inputValue: string,
    callback: (options: CategorySelectOption[]) => void
  ) => {
    let options: CategorySelectOption[] = [];
    axios
      .get<Category[]>(process.env.NEXT_PUBLIC_BASE_URL + "/api/categories") // TODO: Add  axios client maybe
      .then((res) => {
        res.data.forEach((c) => {
          options.push({
            value: c.id,
            label: c.title,
            isFixed: c.slug === routeSlug, // If current category page is the same as fetched category, make it fixed default option
          });
        });
        setSelectedOptions(options.filter((o) => o.isFixed));
      });
    callback(options); // TODO: Try without that, only with state (or vice-versa)
  };

  // This is required only to set Select's fixed values on the first render (otherwise they come undefined).
  useEffect(() => {
    setValue("categories", selectedOptions);
  }, []);

  const onSelectChange = (
    newValue: OnChangeValue<CategorySelectOption, true>,
    actionMeta: ActionMeta<CategorySelectOption>
  ) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = selectedOptions.filter((v) => v.isFixed);
        break;
    }

    setSelectedOptions(orderOptions(newValue));
  };
  const onSubmit = (data: QuestionFormFields) => {
    const request = {
      title: data.title,
      description: data.description,
      categoryIDs: data.categories.map((c) => c.value),
    };

    axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/questions", request, {
      headers: { "api-key": process.env.API_KEY }, // TODO: Pop-up
    });

    reset({ categories: selectedOptions.filter((o) => o.isFixed) });
    setSelectedOptions(selectedOptions.filter((o) => o.isFixed));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Title"
        {...register("title")}
      />
      <p className={styles.error}>{errors.title?.message}</p>

      <textarea
        className={[styles.input, styles.textarea].join(" ")}
        placeholder="Description"
        {...register("description")}
      />
      <p className={styles.error}>{errors.description?.message}</p>
      <Controller
        name="categories"
        control={control as unknown as Control}
        render={({ field: { ref } }) => (
          <AsyncSelect
            value={selectedOptions}
            isClearable={selectedOptions.some((v) => !v.isFixed)}
            placeholder="Select categories"
            loadOptions={getOptions}
            ref={ref}
            styles={selectStyles}
            onChange={onSelectChange}
            defaultOptions
            cacheOptions
            isMulti
            noOptionsMessage={() => "No categories"}
          />
        )}
      />
      <p className={styles.error}>{errors.categories?.message}</p>

      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
};
