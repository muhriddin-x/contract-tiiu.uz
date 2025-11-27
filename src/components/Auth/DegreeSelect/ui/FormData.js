import { AuthCardTitle as Title } from "@/features/auth-card-title/AuthCardTitle";
import { Form } from "@/shared/ui/HookForm";
import * as yup from "yup";
import { AuthCard } from "@/features/auth-card/AuthCard";
import { Button } from "@/features/buttons/auth-button/Button";

export const FormData = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const schema = yup.object().shape({
    phone: yup.string().required("Telefon raqamingizni kiriting"),
  });

  return (
    <AuthCard className="w-[596px]  flex flex-col items-center bg-white rounded-[10px] px-5 py-7  mt-5  mx-auto">
      <Form className="w-full" schema={schema} onSubmit={onSubmit}>
        <Title
          title={
            <>
              Qaysi maqsadda ariza <br /> topshirmoqchisiz?
            </>
          }
        />

        <Button type="submit" className="mt-6">
          Davom etish
        </Button>
      </Form>
    </AuthCard>
  );
};
