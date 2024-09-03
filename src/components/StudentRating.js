import StudentRatingModal from "@/components/StudentRatingModal";

export default function StudentRating() {
  return (
    <div className={`py-3 flex flex-row justify-between w-full`}>
      <StudentRatingModal />
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${
              3 >= star
                ? "text-yellow-400"
                : 3 >= star - 0.5
                ? "text-yellow-400 half-star"
                : "text-gray-300"
            }`}
          >
            <path
              d={
                3 >= star - 0.5 && 3 < star
                  ? "M12 .587l3.668 7.571 8.332 1.151-6.064 5.941 1.517 8.227L12 18.897V.587z" // Meio estrela
                  : "M12 .587l3.668 7.571 8.332 1.151-6.064 5.941 1.517 8.227L12 18.897l-7.453 4.58L6.064 15.25 0 9.309l8.332-1.151L12 .587z" // Estrela completa
              }
            />{" "}
          </svg>
        ))}
      </div>
      <p className="btn hover:cursor-default btn-outline btn-xs rounded-full w-20 btn-warning">
        300 Votos
      </p>
    </div>
  );
}
