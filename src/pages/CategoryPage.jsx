import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "../components/Question";
import { questions, categoryImages } from "../data";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 5);
};

export const CategoryPage = () => {
  const { category } = useParams();

  const imgCategory = categoryImages[category];

  const [questionsFiltered, setQuestionsFiltered] = useState(() =>
    questions.filter((q) => q.category === category)
  );
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(false);

  useEffect(() => {
    const newQuestions = shuffleArray(
      questions.filter((q) => q.category === category)
    );
    setQuestionsFiltered(newQuestions);
    setIndexQuestion(0);
    setActiveQuiz(false);
  }, [category]);

  return (
    <div
      className="container flex flex-col items-center justify-center gap-10"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      {activeQuiz ? (
        <Question
          filteredQuestion={questionsFiltered[indexQuestion]}
          setIndexQuestion={setIndexQuestion}
          indexQuestion={indexQuestion}
          questionsFiltered={questionsFiltered}
          setActiveQuiz={setActiveQuiz}
        />
      ) : (
        <>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl text-teal-900 text-center font-bold">
              {category}
            </h1>

            <div className="flex justify-center items-center">
              {imgCategory ? (
                <img src={imgCategory} alt={category} className="w-72" />
              ) : (
                <div className="w-72 h-48 flex items-center justify-center bg-gray-200">
                  <span>No image available</span>
                </div>
              )}
            </div>
          </div>

          <button
            className="text-white bg-gray-900 py-2 rounded-lg font-bold px-5 transition-all hover:bg-yellow-500 hover:text-gray-900"
            onClick={() => setActiveQuiz(true)}
          >
            Start Quiz
          </button>
        </>
      )}
    </div>
  );
};
