export default function Navbar() {
    return (
        <div className="navbar bg-base-content">
            <div className="flex-none">
                <button className="btn-accent-content btn-square">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1 justify-center items-center">
                <a className="btn btn-ghost text-xl text-primary-context">ProjetIn</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQyfM71DbiJlVIwCJyAVcQHB9VH7GuEYDlPjWFijymfxVioK0UT" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}