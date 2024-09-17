export default function ProjectDetails({ params }) {

    return (
        <main className="w-full max_width">
            <h1>Titulo do projeto</h1>
            <section>
                <div className="flex justify-between items-center">
                    <p className="w-full text-center">Criação: 26/12/1999</p>
                    <div>
                        <div className="badge badge-secondary badge-outline">secondary</div>
                        <div className="badge badge-accent badge-outline">accent</div>
                    </div>
                </div>
            </section>
        </main>
    )
}