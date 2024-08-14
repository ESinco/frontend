import Navbar from '@/components/NavBar';

export default function Projetos() {

    return (
        <main className='h-screen w-screen'>
            <Navbar />
            <div className="text-center mt-5">
                <h1 className="text text-primary-content">Projetos</h1>
            </div>
            <div className="flex justify-center mt-5">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 pr-20 py-2 rounded-full bg-gray-800 text-primary-content placeholder-gray-400 focus:outline-none focus:ring shadow-lg"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="card bg-base-content w-80 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-primary-content">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Candidatar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <div className="card bg-base-content w-80 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-primary-content">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Candidatar</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}