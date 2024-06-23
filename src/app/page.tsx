import H1 from "@/components/custom/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container mt-5">
      <H1>Links to area we are working for now.</H1>
      <ol className="list-decimal list-inside">
        <li>
          <Link href="/dashboard">Dashboard </Link>
        </li>
      </ol>
    </main>
  );
}
