import Link from "next/link";

export default function Navbar() {
  return (
    <div
      className="fixed top-0 navbar flex justify-between navbar_shadow"
      data-theme="dark"
    >
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
        <Link href="/student/profile" className="btn btn-square btn-ghost">
          <img
            alt="profile img"
            className="rounded-full"
            src="https://s3-alpha-sig.figma.com/img/3118/3b3f/aabb13f7765caefd73f1235a7924ba24?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ipdk2OB6L1Nb3XSe9eA9r4kA8qyQ0LAe~VJQlCybQ7wRrfRqbTr1~aNaDTP79sASi~N5tc9JaAXq0OygQQ34MJ9XfhKcIPD8hxDsTH03MNJVG0mOxmKqBXhsW4lssZ7V5zTEOrNtmNO~byAEw4ZWpGDHd2YutVoK~K6oxOS5dZ~WoqrvXOKX3~aff1MjIYixL5cW4gmt~hwMvsa-hxOQGXRPvj5VlWHmid9fOU~F4mh~deh4eVMxqG5hDLS9ngk136XS8JqMdsf~FGfWiIF1uxV39tEXBh2ufvWYmVr1kwB8KcAEh91HiIyZXyA2VKhrm7SJyBGx6OSwXhtSAW~q~w__"
          />
        </Link>
      </div>
    </div>
  );
}
