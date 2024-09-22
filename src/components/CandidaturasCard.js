// components/CandidaturasCard.jsx
import React, { useState } from "react";

const candidates = [
  { id: 1, name: "Dante Alighieri" },
  { id: 2, name: "Clarice Lispector" },
  { id: 3, name: "Sra. Leite das Neves" },
];

const CandidaturasCard = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (id) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCandidates = searchTerm
    ? candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchTerm)
      )
    : candidates;

  return (
    <div className="p-6 bg-base-100 rounded-3xl custom_shadow">
      <h2 className="text-lg text-white mb-4">Candidaturas Pendentes</h2>
      <label className="input flex items-center gap-2 mb-4 rounded-badge input-bordered">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="flex justify-end gap-3 mb-4">
        <button className="btn btn-secondary btn-sm rounded-xl">
          Rejeitar Selecionados
        </button>
        <button className="btn btn-success btn-sm rounded-xl">
          Aprovar Selecionados
        </button>
      </div>
      {filteredCandidates.length > 0 ? (
        filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-2"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="checkbox checkbox-accent"
                checked={selectedCandidates.includes(candidate.id)}
                onChange={() => handleSelect(candidate.id)}
              />
              <span className="text-white">{candidate.name}</span>
            </div>
            <div className="flex space-x-2">
              <button className="btn btn-secondary btn-sm">Rejeitar</button>
              <button className="btn btn-primary btn-sm">Aprovar</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">Nenhum candidato encontrado.</p>
      )}
    </div>
  );
};

export default CandidaturasCard;
