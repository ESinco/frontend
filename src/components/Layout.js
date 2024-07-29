import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="h-screen">{children}</main>
    </div>
  );
}
