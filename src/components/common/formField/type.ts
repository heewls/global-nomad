export type FormFieldRenderProps = {
  onFocus: () => void;
  onBlur: () => void;
  isError: boolean;
};

export interface FormFieldProps {
  id: string;
  label: string;
  errorMessage?: string;
  render: (renderProps: FormFieldRenderProps) => React.ReactNode;
}
