export default function Login() {
    return (
        <main className='h-screen w-screen'>
        <div className="flex items-center justify-center h-full">
            <div className="flex-col flex items-center justify-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-400">ProjetIn</h1>
                    <p className="py-6">

                    </p>
                </div>
                <div className="card bg-[#1D232A] w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400">Email</span>
                            </label>
                            <input type="email" placeholder="" className="input input-bordered border-gray-400 bg-[#1D232A]" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400">Password</span>
                            </label>
                            <input type="password" placeholder="" className="input input-bordered border-gray-400 bg-[#1D232A]" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-gray-400">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="flex justify-center w-full p-4">
                            <span className="label-text text-gray-400 ">Não possui conta ? Cadastre-se</span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </main>
    );
}