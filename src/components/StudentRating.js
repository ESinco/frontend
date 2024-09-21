import StudentRatingModal from "@/components/StudentRatingModal";
import { useEffect } from "react";
import StudentRatingDetail from "./StudentRatingDetail";

export default function StudentRating({ feedbacks, matAluno, aluno }) {
  return (
    <div className={`py-3 flex flex-row justify-between w-full`}>
      <StudentRatingModal feedbacks={feedbacks} matAluno={matAluno} />

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-warning btn-outline btn-xs w-20 rounded-full"
        onClick={() => document.getElementById("ava_modal").showModal()}
      >
        Avaliações
      </button>
      <dialog id="ava_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              X
            </button>
          </form>
          <StudentRatingDetail data={aluno.data?.avaliacao} />
        </div>
      </dialog>
    </div>
  );
}
