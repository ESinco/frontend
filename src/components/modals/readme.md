A pasta concentra todos os modais da aplicação, sejam eles de aluno ou não.

Todos os modais devem adotar como padrão de exportação um objeto no formato:

```javascript
return ({
    open, // Função helper para abrir o modal
    Modal, // O componente JSX do modal
})
```

Seguir o exemplo:

```jsx
import { useState } from "react";

function open() {
    return document.getElementById('create_project_modal').showModal();
}

function Modal() {
    const [ data, setData ] = useState({
        name: "",
        lab: "",
        slots: 0, //quantidade de vagas abertas
    })



    return (
            <>
                <button className="btn" onClick={open}>open modal</button>
                    <dialog id="create_project_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {   /* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
            </>
    )
}

const CreateProject = {
    open,
    Modal
}

export default CreateProject;
```