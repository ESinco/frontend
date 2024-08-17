import Navbar from "@/components/Navbar";

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
