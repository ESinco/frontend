import { useRouter } from "next/router";
import "../../app/globals.css";

export default function UserProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  // GET USER from DATABASE with username = username...

  return (
    <div>
      {/* DIV INFORMACOES INICIAIS */}
      <div className="flex justify-center flex-col items-start mx-7 my-2">
        <p>Venâncio Augusto de Magalhães Neiva</p>
        <div>
          <p>https://www.linkedin.com/in/venancio-neiva/</p>
        </div>
        <div>
          <p>venancio.neiva@ccc.ufcg.edu.br</p>
        </div>
        <div>
          <p>(83) 9 9623-1204</p>
        </div>
      </div>
      {/* EXPERIENCIAS COMPONENT */}
      <div className="bg-base-100 flex flex-col items-center justify-center w-11/12 mx-auto rounded-3xl my-7">
        <h1 className="text-2xl py-3">Experiencias</h1>
        <div className="card bg-base-300 w-11/12 mb-3">
          <div className="card-body p-4">
            <h2 className="card-title">Shoes!</h2>
            <p className="text-xs">
              Descrição Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation 
            </p>
            <div className="card-actions justify-end ">
              <div className="badge badge-secondary">NEW</div>
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </div>
      {/* HABILIDADES CARD - THINK ABOUT A WAY TO MAKE BADGE 'CLASSES' EACH ONE'LL HAVE A SYMBOL AND A COLOR */}
      <div className="bg-base-100 flex flex-col items-start justify-between px-5 w-11/12 mx-auto rounded-3xl my-7 h-28">
        <h1 className="text-2xl py-3">Habilidades</h1>
        <div className="card-actions justify-end pb-4">
          <div className="badge badge-secondary">NEW</div>
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
      {/* INTERESSES CARD - THINK ABOUT A WAY TO MAKE BADGE 'CLASSES' EACH ONE'LL HAVE A SYMBOL AND A COLOR */}
      <div className="bg-base-100 flex flex-col items-start justify-between px-5 w-11/12 mx-auto rounded-3xl my-7 h-28">
        <h1 className="text-2xl py-3">Habilidades</h1>
        <div className="card-actions justify-end pb-4">
          <div className="badge badge-secondary">NEW</div>
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}
