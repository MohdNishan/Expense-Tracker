import { AddExpense } from "@/components/ui/Form/expenseform";
import { DataTableDemo } from "@/components/ui/Table/expensetable";

export default async function Home() {
  return (
    <section className="container">
      <DataTableDemo/>
      <AddExpense/>
    </section>
  );
}
