import Navbar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex justify-center w-full items-center mt-[60px]">
        {children}
      </main>
    </>
  );
}
