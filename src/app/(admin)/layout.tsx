import Navbar from "./_components/navbar";
import SideMenu from "./_components/sidemenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-start bg-primary/5 dark:bg-primary/10">
      <SideMenu />
      <div className="flex-1">
        <Navbar />
        <main className="bg-primary-foreground/80">{children}</main>
      </div>
    </div>
    </>
  );
}
