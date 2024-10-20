import Link from "next/link";

export function NavBar() {
  const links = [
    { label: "Bust and waist ratio", url: "bust-waist" },
    { label: "Long leg, short leg", url: "leg" },
    { label: "Tummy", url: "tummy" },
    { label: "Bum", url: "bum" },
    { label: "DNA", url: "dna" },
  ];

  return (
    <nav className="bg-slate-800 p-2">
      <ul className="flex flex-row gap-2">
        {links.map((li) => (
          <li key={li.url} style={{ borderRight: "2px #fff solid", paddingRight: "8px" }}>
            <Link href={li.url}>{li.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
