import { Device1 } from "./devices/Device1";
import { Device2 } from "./devices/Device2";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-evenly bg-zinc-50 font-sans dark:bg-black">
      {/* Device 1 */}
      <Device1 />
      {/* Device 2 */}
      <Device2 />
    </div>
  );
}
