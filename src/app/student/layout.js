import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="h-screen">{children}</main>
    </div>
  );
}
