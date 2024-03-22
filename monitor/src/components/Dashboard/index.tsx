import Count from "./charts/Count";
import Executions from "./charts/Executions";
import Title from "./sections/Title";

export default function Dashboard() {
  return (
    <div className="container flex flex-col gap-4 py-8">
      <Title />
      <div className="flex gap-4">
        <Count />
        <Count />
        <Count />
        <Count />
      </div>
      <Executions />
    </div>
  );
}
