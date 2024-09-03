import { useState } from "react";

export default function ModalSkills() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };
  return (
    <>
      <button
        className="btn btn-warning btn-xs w-20 rounded-full"
        onClick={() => document.getElementById("rating_modal").showModal()}
      >
        Avaliar
      </button>
      <dialog id="rating_modal" className="modal mt-20 items-start">
        <div className="modal-box p-5 flex flex-col items-center justify-between">
          <h3 className=" text-lg text-center">Avalie Venancio Augusto</h3>

          <div className="modal-action w-full justify-normal flex flex-col items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                const isFilled = ratingValue <= rating;
                const isHovered = ratingValue <= hover;
                return (
                  <svg
                    key={index}
                    className={`w-8 h-8 cursor-pointer transition-colors duration-200
                      ${
                        isFilled
                          ? "text-yellow-500 opacity-100"
                          : isHovered
                          ? "text-yellow-500 opacity-50"
                          : "text-gray-400 opacity-100"
                      }`}
                    onClick={() => handleClick(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927C9.325 2.003 10.675 2.003 10.951 2.927L12.16 7.248a1 1 0 00.95.69h4.1c1.016 0 1.436 1.302.621 1.854l-3.319 2.347a1 1 0 00-.364 1.118l1.27 3.907c.329 1.012-.814 1.854-1.656 1.236l-3.34-2.396a1 1 0 00-1.175 0l-3.34 2.396c-.842.618-1.985-.224-1.656-1.236l1.27-3.907a1 1 0 00-.364-1.118L2.168 9.792c-.815-.552-.395-1.854.621-1.854h4.1a1 1 0 00.95-.69l1.209-4.321z" />
                  </svg>
                );
              })}
            </div>

            {/* if there is a button in form, it will close the modal */}
            <div className="gap-4 flex pt-10 ml-auto">
              <button className="btn btn-error ">Cancelar</button>
              <button className="btn btn-success ">Confirmar</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
