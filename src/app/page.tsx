import { AddExpense } from "@/components/ui/Form/expenseform";
import { DataTableDemo } from "@/components/ui/Table/expensetable";

export default async function Home() {
  return (
    <section className="container">
      <div className="-mt-10">
        <img src="/logo.png"  width={55} height={55} />
      </div>
      <DataTableDemo/>
      <AddExpense/>
    </section>
  );
}
