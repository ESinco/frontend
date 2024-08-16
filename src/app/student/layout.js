import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <main className="flex justify-center w-full items-center mt-[64px]">
        {children}
      </main>
      <Navbar />
    </>
  );
}
