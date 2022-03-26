import Link from "next/link";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="flex h-16 px-8 bg-gray-900 text-gray-50 items-center">
        <strong>Porto App</strong>
      </header>
      <div className="flex h-full">
        <aside className="bg-gray-900 text-gray-50 w-64">
          <div className="flex flex-col">
            <Link href="/">
              <a>Contêiners</a>
            </Link>
            <Link href={"/movements"}>
              <a>Movimentações</a>
            </Link>
          </div>
        </aside>
        <main className="p-8 w-full bg-gray-800 text-gray-200">{children}</main>
      </div>
    </div>
  );
};
