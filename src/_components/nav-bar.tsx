import Link from "next/link";

export function NavBar() {
  const links = [{ label: "Bust and waist ratio", url: "bust-waist" }];

  return (
    <nav className="bg-slate-800 p-2">
      <ul className="flex flex-row gap-2">
        {links.map((li) => (
          <li key={li.url} className="border-r-2 pr-2">
            <Link href={li.url}>{li.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
