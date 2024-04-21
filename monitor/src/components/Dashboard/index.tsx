import Traces from "./sections/Traces";
import Counts from "./sections/Counts";
import Title from "./sections/Title";
import Scrapers from "./sections/scrapers";

export default function Dashboard() {
  return (
    <div className="container flex flex-col gap-4 py-8">
      <Title />
      <Counts />
      <Scrapers />
      <Traces />
    </div>
  );
}
