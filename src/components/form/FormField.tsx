import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  type?: string;
  id: string;
  register: UseFormRegister<any>;
  validation?: Record<string, any>;
  errors: FieldErrors;
  [key: string]: any;
}

function FormField({
  label,
  type = "text",
  id,
  register,
  validation,
  errors,
  ...rest
}: FormFieldProps) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...rest}
        {...register(id, validation)}
        className={`mt-1 block w-full border ${
          errors[id] ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
      />
    </>
  );
}

export default FormField;
