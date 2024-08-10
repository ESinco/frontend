export default function Login() {
    return (
        <main className='h-screen w-screen'>
        <div className="flex items-center justify-center h-full">
            <div className="flex-col flex items-center justify-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-primary-content">ProjetIn</h1>
                    <p className="py-6">

                    </p>
                </div>
                <div className="card bg-[#1D232A] w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary-content">Email</span>
                            </label>
                            <input type="email" placeholder="" className="input input-bordered border-primary-content bg-[#1D232A]" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary-content">Senha</span>
                            </label>
                            <input type="password" placeholder="" className="input input-bordered border-primary-content bg-[#1D232A]" required />
                            <label className="flex p-1">
                                <a href="#" className="label-text-alt link link-hover text-primary-content">Esqueceu sua senha?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <label className="flex justify-center w-full p-4">
                            <a href="/signup/aluno" className=" label-text-alt link link-hover text-primary-content">Não possui conta ? Cadastre-se</a>
                        </label>
                    </form>
                </div>
            </div>
        </div>
        </main>
    );
}