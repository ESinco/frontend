import { useRouter } from "next/router";
import "../../app/globals.css";
import ExperienciasCard from "@/components/ExperienciasCard";
import HabilidadesCard from "@/components/HabilidadesCard";

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
      <ExperienciasCard></ExperienciasCard>
      {/* HABILIDADES CARD - THINK ABOUT A WAY TO MAKE BADGE 'CLASSES' EACH ONE'LL HAVE A SYMBOL AND A COLOR */}

      <HabilidadesCard></HabilidadesCard>
      {/* INTERESSES CARD - THINK ABOUT A WAY TO MAKE BADGE 'CLASSES' EACH ONE'LL HAVE A SYMBOL AND A COLOR */}
      <HabilidadesCard></HabilidadesCard>
    </div>
  );
}
