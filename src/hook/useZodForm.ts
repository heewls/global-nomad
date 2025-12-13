import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

export default function useZodForm<T extends FieldValues>({
  validationSchema,
  defaultValues,
  ...rest
}: {
  validationSchema: ZodType<T, T>;
  defaultValues: UseFormProps<T>["defaultValues"];
} & Omit<UseFormProps<T>, "resolver" | "defaultValues">): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "all",
    ...rest,
  });
}
