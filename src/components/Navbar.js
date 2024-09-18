"use client"
import SessionContext from "@/contexts/sessionContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
    const session = useContext(SessionContext);
  return (
    <div className="fixed top-0 navbar flex justify-between navbar_shadow" data-theme="dark">
    <div className="">
      <Link href={"/"} className="btn btn-ghost text-xl">
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
                        <Link href={session.data.isTeacher ? "/professor/projects" : "/student/profile"} className="justify-between">
                            {session.data.isTeacher ? "Projetos" : "Perfil"}
                        </Link>
                    </li>
                    <li><a>Alterar Senha</a></li>
                    <li><button onClick={session.logOut}>Sair</button></li>
                </ul>
            </div>
  </div>
  );
}
