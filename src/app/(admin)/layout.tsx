import { AlertDialogProvider } from "@/components/dialog/AlertDialogProvider";
import Navbar from "./_components/navbar";
import SideMenu from "./_components/sidemenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AlertDialogProvider>
      <div className="flex items-start bg-primary/5 dark:bg-primary/10">
        <SideMenu />
        <div className="flex-1 w-full overflow-x-hidden">
          <Navbar />
          <main className="container">{children}</main>
        </div>
      </div>
    </AlertDialogProvider>
  );
}
