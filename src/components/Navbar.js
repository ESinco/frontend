import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="">
                <button className="btn btn-square btn-ghost">
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
                </button>
            </div>
            <div className="">
                <Link href={"/"} className="btn btn-ghost text-xl">
                    ProjetIn
                </Link>
            </div>
            <div className="">
                <button className="btn btn-square btn-ghost">
                    <img
                        alt="profile img"
                        className="rounded-full"
                        src="https://s3-alpha-sig.figma.com/img/3118/3b3f/aabb13f7765caefd73f1235a7924ba24?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKmpCqbNAMsyOfmVH785-UoK2XnnMqL2UUTYq83fmpE819jOecxSufDwVTCti6zgfABEoUS9rzZyLTvvwEE3mCbUjEQO3mFur-0Hqqwtio7Xc87CTO8R1gEbWqvDEafPctWsLnrjjxCTb5iS4F4pcydxvkcdJPUc4jDFdpl020PSa7W906ncSKWmw7Qsy4WN0MeFPbbupeBuvnBAaaqvHIo3GhwCEBo0exTlXoNwF2WFp17fouR4gjE1v1PgYAJ2wG2xQkwoblqPawXLh8a1kp8NbM5DzDh0LSKkQ5FvPojMsf8gqN~Q7VU5dK1E5vpinxDXeAy5Y14sVB8j-uxdCw__"
                    />
                </button>
            </div>
        </div>
    );
}