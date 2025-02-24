"use client";

import { useState } from "react";

interface Exercise {
  name: string;
  repetitions: number;
  series: number;
  done: boolean;
}

export default function ChecklistTreino() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState("Novo Exercício");
  const [repetitions, setRepetitions] = useState<number>(15);
  const [series, setSeries] = useState<number>(3);

  const addExercise = () => {
    if (newExercise.trim() && repetitions && series) {
      setExercises([
        ...exercises,
        { name: newExercise, repetitions, series, done: false },
      ]);
      setNewExercise("Novo Exercício");
      setRepetitions(15);
      setSeries(3);
    }
  };

  const toggleExercise = (index: number) => {
    setExercises(
      exercises.map((exercise, i) =>
        i === index ? { ...exercise, done: !exercise.done } : exercise
      )
    );
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const formatSeriesText = (exercise: Exercise) => {
    return `${exercise.series} ${exercise.series === 1 ? "série" : "séries"} de ${exercise.name} (${exercise.repetitions}x)`;
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Título com borda */}
      <h1 className="text-xl font-bold text-center p-4 border rounded-md">
        Checklist de Treino 🏋️‍♂️
      </h1>

      {/* Campo de adicionar exercício com borda */}
      <div className="p-4 border rounded-md space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            placeholder="Nome do exercício"
            className="border p-2 rounded-l-md flex-grow"
          />
          <button
            onClick={addExercise}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            +
          </button>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Séries: {series}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={series}
              onChange={(e) => setSeries(Number(e.target.value))}
              className="w-24"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm">Repetições: {repetitions}</label>
            <input
              type="range"
              min="5"
              max="50"
              value={repetitions}
              onChange={(e) => setRepetitions(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Lista de exercícios */}
      <div className="space-y-2">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exercise.done}
                onChange={() => toggleExercise(index)}
              />
              <span className={exercise.done ? "line-through text-gray-500" : ""}>
                {formatSeriesText(exercise)}
              </span>
            </div>
            <button
              onClick={() => removeExercise(index)}
              className="text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
