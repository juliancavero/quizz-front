import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GetQuizParams = {
  quizId: string;
  accessToken: string;
};

export type Pregunta = {
  _id: string;
  texto: string;
  respuestas: string[];
  indiceRespuestaCorrecta: number;
  imagen?: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type Quiz = {
  _id: string;
  titulo: string;
  preguntas: Pregunta[];
  scores?: string[];
  difficulty: "easy" | "medium" | "hard" | "impossible";
  difficultyText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const getQuiz = async ({ quizId, accessToken }: GetQuizParams) => {
  const { data } = await axios.get<Quiz>(
    `http://localhost:8080/quizzes/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

const useGetQuiz = (params: GetQuizParams) => {
  return useQuery({
    queryKey: ["quiz", params.quizId],
    queryFn: () => getQuiz(params),
    enabled: !!params.quizId && !!params.accessToken,
  });
};

export default useGetQuiz;
