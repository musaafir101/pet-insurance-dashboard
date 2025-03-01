import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white min-h-screen p-5">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="block p-2 hover:bg-blue-500">
              🏠 Dashboard
            </Link>
          </li>
          <li>
            <Link href="/policies" className="block p-2 hover:bg-blue-500">
              📜 Policies
            </Link>
          </li>
          <li>
            <Link href="/claims" className="block p-2 hover:bg-blue-500">
              🏥 Claims
            </Link>
          </li>
          <li>
            <Link href="/profile" className="block p-2 hover:bg-blue-500">
              👤 Profile
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block p-2 hover:bg-blue-500">
              ⚙️ Settings
            </Link>
          </li>
          <li>
            <Link href="/support" className="block p-2 hover:bg-blue-500">
              📞 Support
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
