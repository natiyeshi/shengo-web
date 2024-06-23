import { Title } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container mt-5">
      <Title order={1}>Links to pages&apos; that we currently working on.</Title>
      <ol className="list-inside list-decimal">
        <li>
          <Link href="/dashboard">Dashboard </Link>
        </li>
      </ol>
    </main>
  );
}
