import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { useRouter } from "next/router";
import { SectionHeader } from "./ui/SectionHeader";
import { PaymentSummary } from "./ui/PaymentSummary";
import { PaymentHistoryTable } from "./ui/PaymentHistoryTable";
import { Card } from "@/shared/ui/Card/Card";
import { StudentMeType } from "@/entities/user/model/MyDataTypes";
import { useMyData } from "@/entities/user/api/useMyData";
import { useGetMyInvoiceAdmissionYearQuery } from "@/entities/user/api/useGetMyInvoiceAdmissionYear";

export const PaymentHistory = () => {
  const router = useRouter();

  const { data, isLoading } = useMyData(
    StudentMeType.INVOICES,
    router.query.admission_year
  );
  const { data: years, isLoading: isYearLoading } =
    useGetMyInvoiceAdmissionYearQuery();

  if (isLoading) return null;

  return (
    <ProtectedRoute redirectURL={"/"}>
      <Header>
        <Container className=" !px-0 mt-5">
          <Sidebar page={router.pathname}>
            <SectionHeader admissionYears={years} myApplication={data} />
            <Card className="!mt-5">
              <PaymentSummary invoices={data} />
              <PaymentHistoryTable invoices={data?.invoice_data} />
            </Card>
          </Sidebar>
        </Container>
      </Header>
    </ProtectedRoute>
  );
};
