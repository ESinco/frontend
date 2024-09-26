"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/api/services/project";
import { getExperienciasData, getInteressesData, getHabilidadesData, getDisciplinasData } from "@/lib/api/services/tags";

function getUniqueExperiences(candidates) {
    const allExperiences = candidates.flatMap(
        (candidate) => candidate.aluno.experiencias || []
    );
    const uniqueExperiences = [...new Set(allExperiences.map((exp) => exp.nome))]; // Get unique experience names
    return uniqueExperiences;
}

function filterByEveryKey(candidates, input) {
    const dicionarioStatus = {
        pendente: "null",
        aceito: "true",
        rejeitado: "false",
    };
    if (input.length === 0) return candidates;
    return candidates.filter((candidate) => {
        if (String(candidate.status) === dicionarioStatus[input]) return true;
        for (const key in candidate.aluno) {
            if (
                String(candidate.aluno[key])
                    .toLowerCase()
                    .search(input.toLowerCase()) >= 0
            )
                return true;
        }
        return false;
    });
}

function filterByName(candidates, input) {
    if (input.length === 0) return candidates;
    return candidates.filter(
        (candidate) =>
            candidate.aluno.nome.toLowerCase().search(input.toLowerCase()) >= 0
    );
}

function filterByMatricula(candidates, input) {
    if (input.length === 0) return candidates;
    return candidates.filter(
        (candidate) =>
            candidate.aluno.matricula.toLowerCase().search(input.toLowerCase()) >= 0
    );
}

function filterByEmail(candidates, input) {
    if (input.length === 0) return candidates;
    return candidates.filter(
        (candidate) =>
            candidate.aluno.email.toLowerCase().search(input.toLowerCase()) >= 0
    );
}

function filterByStatus(candidates, input) {
    if (input.length === 0) return candidates;
    return candidates.filter(
        (candidate) =>
            String(candidate.status).toLowerCase().search(input.toLowerCase()) >= 0
    );
}

function filterByCra(candidates, input) {
    if (input.length === 0) return candidates;
    return candidates.filter((candidate) => candidate.aluno.cra >= Number(input));
}

function filterByExperiencias(candidates, selectedExperiences) {
    if (selectedExperiences.length === 0) return candidates;
    return candidates.filter((candidate) => {
        return (
            candidate.aluno.experiencias &&
            candidate.aluno.experiencias.some((experienciaObj) => {
                return selectedExperiences.includes(experienciaObj.nome);
            })
        );
    });
}

function filterByInteresses(candidates, selectedInteresses) {
    if (selectedInteresses.length === 0) return candidates;
    return candidates.filter((candidate) => {
        return (
            candidate.aluno.interesses &&
            candidate.aluno.interesses.some((interesseObj) => {
                return selectedInteresses.includes(interesseObj.nome);
            })
        );
    });
}

function filterByHabilidades(candidates, selectedHabilidades) {
    if (selectedHabilidades.length === 0) return candidates;
    return candidates.filter((candidate) => {
        return (
            candidate.aluno.habilidades &&
            candidate.aluno.habilidades.some((habilidadeObj) => {
                return selectedHabilidades.includes(habilidadeObj.nome);
            })
        );
    });
}

function filterByDisciplinas(candidates, { nomeDisciplina, notaMinima }) {
    if (!nomeDisciplina && !notaMinima) return candidates;

    return candidates.filter(candidate => {
        if (!candidate.aluno.disciplinas_matriculadas || candidate.aluno.disciplinas_matriculadas.length === 0) {
            return false;
        }

        return candidate.aluno.disciplinas_matriculadas.some(disciplinaObj => {
            const disciplinaMatch = !nomeDisciplina ||
                (disciplinaObj.disciplina && disciplinaObj.disciplina.nome.toLowerCase().includes(nomeDisciplina.toLowerCase()));

            const notaMatch = !notaMinima ||
                (disciplinaObj.media !== undefined && disciplinaObj.media >= parseFloat(notaMinima));

            return disciplinaMatch && notaMatch;
        });
    });
}

export default function CandidateFilter({ emitFilteredData, project }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isExperiencesDropdownOpen, setIsExperiencesDropdownOpen] = useState(false);
    const [isInteressesDropdownOpen, setIsInteressesDropdownOpen] = useState(false);
    const [isHabilidadesDropdownOpen, setIsHabilidadesDropdownOpen] = useState(false);
    const [isDisciplinasDropdownOpen, setIsDisciplinasDropdownOpen] = useState(false);
    const [disciplinaSearchQuery, setDisciplinaSearchQuery] = useState("");
    const [genericFilter, setGenericFilter] = useState("");
    const [filters, setFilters] = useState({
        nome: "",
        matricula: "",
        email: "",
        status: "",
        cra: "",
        nomeDisciplina: "",
        notaMinima: "",
        experiencias: [], // Multiple experiences selection
        interesses: [], // Multiple interests selection
        habilidades: [], // Multiple skills selection
    });

    const { data: allExperiences, isLoading: isLoadingExperiences } = useQuery({
        queryKey: ["experiences_data"],
        queryFn: () => getExperienciasData(),
    });

    const { data: allInteresses, isLoading: isLoadingInteresses } = useQuery({
        queryKey: ["interesses_data"],
        queryFn: () => getInteressesData(),
    });

    const { data: allHabilidades, isLoading: isLoadingHabilidades } = useQuery({
        queryKey: ["habilidades_data"],
        queryFn: () => getHabilidadesData(),
    });

    const { data: allDisciplinas, isLoading: isLoadingDisciplinas } = useQuery({
        queryKey: ["disciplinas_data"],
        queryFn: () => getDisciplinasData(),
    });

    useEffect(() => {
        if (!project.data || project.isLoading) return;

        let filteredData = filterByName(project.data.candidates, filters.nome);
        filteredData = filterByEmail(filteredData, filters.email);
        filteredData = filterByMatricula(filteredData, filters.matricula);
        filteredData = filterByStatus(filteredData, filters.status);
        filteredData = filterByCra(filteredData, filters.cra);
        filteredData = filterByDisciplinas(filteredData, {
            nomeDisciplina: filters.nomeDisciplina,
            notaMinima: filters.notaMinima,
        });
        filteredData = filterByExperiencias(filteredData, filters.experiencias); // Multiple experiences filter
        filteredData = filterByInteresses(filteredData, filters.interesses); // Multiple interests filter
        filteredData = filterByHabilidades(filteredData, filters.habilidades);
        emitFilteredData(filteredData);
    }, [project.data, filters]);

    useEffect(() => {
        if (!project.data || project.isLoading) return;
        const filteredData = filterByEveryKey(
            project.data.candidates,
            genericFilter
        );
        emitFilteredData(filteredData);
    }, [genericFilter]);

    const filteredDisciplinas = allDisciplinas?.filter((disciplina) =>
        disciplina.nome.toLowerCase().includes(disciplinaSearchQuery.toLowerCase())
      );

    return (
        <div className="collapse w-full p-2 search_shadow bg-neutral">
            <input
                type="checkbox"
                className="peer"
                onClick={() => {
                    setIsOpen((prev) => !prev);
                    setGenericFilter("");
                }}
            />
            <div className="collapse-title p-0 m-0 h-fit w-full text-center">
                {isOpen ? "Esconder busca avançada" : "Exibir busca avançada"}
            </div>

            <div className="collapse-content m-0 p-0 h-fit">
                <div className="join w-full">
                    <input
                        type="text"
                        className="grow input input-bordered"
                        placeholder="Nome"
                        disabled={!isOpen}
                        value={filters.nome}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, nome: e.target.value }))
                        }
                    />
                    <input
                        type="text"
                        className="grow input input-bordered"
                        placeholder="E-mail"
                        disabled={!isOpen}
                        value={filters.email}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, email: e.target.value }))
                        }
                    />
                </div>

                <div className="flex justify-center gap-4 my-4">
                    <div className="relative">
                        <button
                            className="btn btn-bordered"
                            onClick={() => setIsExperiencesDropdownOpen(!isExperiencesDropdownOpen)}
                            disabled={!isOpen || isLoadingExperiences} // Disable if experiences are loading
                        >
                            {filters.experiencias.length > 0
                                ? `${filters.experiencias.length} Experiências Selecionadas`
                                : "Selecionar Experiências"}
                        </button>
                        {isExperiencesDropdownOpen && (
                            <ul className="absolute z-10 bg-base-100 border border-gray-300 rounded w-full max-h-48 overflow-y-auto shadow-md">
                                {allExperiences?.map((experience) => (
                                    <li key={experience} className="p-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={filters.experiencias.includes(experience)}
                                                onChange={(e) => {
                                                    const newExperiences = e.target.checked
                                                        ? [...filters.experiencias, experience]
                                                        : filters.experiencias.filter(
                                                            (exp) => exp !== experience
                                                        );
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        experiencias: newExperiences,
                                                    }));
                                                }}
                                            />
                                            <span className="ml-2">{experience.nome}</span>
                                        </label>
                                    </li>
                                ))}
                                <li className="p-2">&nbsp;</li>
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className="btn btn-bordered"
                            onClick={() => setIsInteressesDropdownOpen(!isInteressesDropdownOpen)}
                            disabled={!isOpen || isLoadingInteresses} // Disable if interests are loading
                        >
                            {filters.interesses.length > 0
                                ? `${filters.interesses.length} Interesses Selecionados`
                                : "Selecionar Interesses"}
                        </button>
                        {isInteressesDropdownOpen && (
                            <ul className="absolute z-10 bg-base-100 border border-gray-300 rounded w-full max-h-48 overflow-y-auto shadow-md">
                                {allInteresses?.map((interesse) => (
                                    <li key={interesse} className="p-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={filters.interesses.includes(interesse)}
                                                onChange={(e) => {
                                                    const newInteresses = e.target.checked
                                                        ? [...filters.interesses, interesse]
                                                        : filters.interesses.filter(
                                                            (int) => int !== interesse
                                                        );
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        interesses: newInteresses,
                                                    }));
                                                }}
                                            />
                                            <span className="ml-2">{interesse.nome}</span>
                                        </label>
                                    </li>
                                ))}
                                <li className="p-2">&nbsp;</li>
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className="btn btn-bordered"
                            onClick={() => setIsHabilidadesDropdownOpen(!isHabilidadesDropdownOpen)}
                            disabled={!isOpen || isLoadingHabilidades} // Disable if skills are loading
                        >
                            {filters.habilidades.length > 0
                                ? `${filters.habilidades.length} Habilidades Selecionadas`
                                : "Selecionar Habilidades"}
                        </button>
                        {isHabilidadesDropdownOpen && (
                            <ul className="absolute z-10 bg-base-100 border border-gray-300 rounded w-full max-h-48 overflow-y-auto shadow-md">
                                {allHabilidades?.map((habilidade) => (
                                    <li key={habilidade} className="p-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={filters.habilidades.includes(habilidade)}
                                                onChange={(e) => {
                                                    const newHabilidades = e.target.checked
                                                        ? [...filters.habilidades, habilidade]
                                                        : filters.habilidades.filter(
                                                            (hab) => hab !== habilidade
                                                        );
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        habilidades: newHabilidades,
                                                    }));
                                                }}
                                            />
                                            <span className="ml-2">{habilidade.nome}</span>
                                        </label>
                                    </li>
                                ))}
                                <li className="p-2">&nbsp;</li>
                            </ul>
                        )}
                    </div>
                </div>

            
            <div className="flex justify-center gap-4 my-4">
          {/* Botão para dropdown de Disciplinas */}
          <div className="relative">
            <button
              className="btn btn-bordered"
              onClick={() => setIsDisciplinasDropdownOpen(!isDisciplinasDropdownOpen)}
              disabled={!isOpen || isLoadingDisciplinas}
            >
              {filters.nomeDisciplina
                ? `Disciplina: ${filters.nomeDisciplina}`
                : "Selecionar Disciplina"}
            </button>
            {isDisciplinasDropdownOpen && (
              <div className="absolute z-10 bg-base-100 border border-gray-300 rounded w-full max-h-72 overflow-y-auto shadow-md">
                {/* Campo de busca */}
                <input
                  type="text"
                  className="input input-sm w-full p-2 border-b border-gray-300"
                  placeholder="Buscar disciplina..."
                  value={disciplinaSearchQuery}
                  onChange={(e) => setDisciplinaSearchQuery(e.target.value)}
                />
                {/* Lista de disciplinas filtradas */}
                <ul className="w-full">
                  {filteredDisciplinas?.map((disciplina) => (
                    <li key={disciplina.codigo} className="p-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="disciplina"
                          className="checkbox checkbox-sm"
                          checked={filters.nomeDisciplina === disciplina.nome}
                            onChange={() =>
                            setFilters((prev) => ({
                                ...prev,
                                nomeDisciplina:
                                filters.nomeDisciplina === disciplina.nome
                                    ? ""
                                    : disciplina.nome,
                            }))
                          }
                        />
                        <span className="ml-2">{disciplina.nome} ({disciplina.codigo})</span>
                      </label>
                    </li>
                  ))}
                  {filteredDisciplinas?.length === 0 && (
                    <li className="p-2 text-gray-500 text-sm">
                      Nenhuma disciplina encontrada.
                    </li>
                  )}
                  <li className="p-2">&nbsp;</li>
                </ul>
              </div>
            )}
          </div>

          <input
            type="number"
            className="w-40 input input-bordered mt-2"
            placeholder="Nota Mínima"
            disabled={!isOpen}
            value={filters.notaMinima}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, notaMinima: e.target.value }))
            }
          />
        </div>

                {/* Remaining inputs for Matricula, CRA, and Status */}
                <div className="join w-full">
                    <input
                        type="number"
                        className="grow input input-bordered"
                        placeholder="Matrícula"
                        disabled={!isOpen}
                        value={filters.matricula}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, matricula: e.target.value }))
                        }
                    />
                    <input
                        type="number"
                        className="grow input input-bordered"
                        placeholder="CRA"
                        disabled={!isOpen}
                        value={filters.cra}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, cra: e.target.value }))
                        }
                    />
                    <select
                        className="grow select select-bordered"
                        disabled={!isOpen}
                        value={filters.status}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, status: e.target.value }))
                        }
                    >
                        <option value="">Status</option>
                        <option value="true">Aceito</option>
                        <option value="false">Rejeitado</option>
                        <option value="null">Pendente</option>
                    </select>
                </div>
            </div>

            <search className="flex items-center justify-center">
                <search className="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="grow"
                        placeholder=""
                        disabled={isOpen}
                        value={genericFilter}
                        onChange={(e) => setGenericFilter(e.target.value)}
                    />
                    <button className="btn btn-xs">Aplicar filtro</button>
                </search>
            </search>
        </div>
    );
}