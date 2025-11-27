import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

export const Form = ({
  defaultValues,
  children,
  onSubmit,
  className,
  schema,
  methods,
  ...props
}) => {
  const internalMethods =
    methods ||
    useForm({
      resolver: yupResolver(schema),
      defaultValues,
      ...props,
    });

  const { handleSubmit } = internalMethods;

  return (
    <FormProvider {...internalMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};
