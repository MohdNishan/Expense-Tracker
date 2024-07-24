import { AddExpense } from "@/components/Form/expenseform";
import TaskPage from "@/components/Table/expensetable";
import { DataTableDemo } from "@/components/Table/expensetable1";

export default async function Home() {
  return (
    <section className="container">
      <div className="-mt-10">
        <img src="/logo.png"  width={55} height={55} />
      </div>
      <TaskPage/>
      {/* <DataTableDemo/> */}
      <AddExpense/>
    </section>
  );
}
