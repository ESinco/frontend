"use client"
import SessionContext from "@/contexts/sessionContext";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const session = useContext(SessionContext);
    const router = useRouter();
  return (
    <div className="fixed top-0 navbar flex justify-between navbar_shadow" data-theme="dark">
    <div className="">
      <Link href={"/student/projects"} className="btn btn-ghost text-xl">
        ProjetIn
      </Link>
    </div>

    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                ></path>
                </svg>
                </div>

                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <Link href={session.data?.isTeacher ? "/professor" : "/student/profile"} className="justify-between">
                            {session.data?.isTeacher ? "Projetos" : "Perfil"}
                        </Link>
                    </li>
                    {!session.data?.isTeacher && (
                        <>
                            <li>
                                <Link href="/student/applications">Candidaturas</Link>
                            </li>
                            <li>
                                <Link href="/student/projects">Projetos</Link>
                            </li>
                        </>
                    )}
                    <li><button onClick={() => {
                        session.logOut();
                        router.push("/login");
                    }}>Sair</button></li>
                </ul>
            </div>
  </div>
  );
}