import React, { useEffect, useState } from 'react';
import { Results } from './Results';

export const Question = ({
	filteredQuestion,
	questionsFiltered,
	indexQuestion,
	setIndexQuestion,
	setActiveQuiz,
}) => {
	const [score, setScore] = useState(0);
	const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
	const [answered, setAnswered] = useState(false);
	const [answersRandom, setAnswersRandom] = useState([]);
	const [activeResults, setActiveResults] = useState(false);
	const [wasCorrect, setWasCorrect] = useState(null);

	useEffect(() => {
		const answers = [
			...filteredQuestion.incorrect_answers,
			filteredQuestion.correct_answer,
		];
		setAnswersRandom(answers.sort(() => Math.random() - 0.5));
	}, [filteredQuestion]);

	const checkAnswer = (answerText, index) => {
		const correct = answerText === filteredQuestion.correct_answer;
		if (correct) {
			setScore(score + 1);
		}
		setSelectAnswerIndex(index);
		setAnswered(true);
		setWasCorrect(correct);
	};

	const onNextQuestion = () => {
		setIndexQuestion(indexQuestion + 1);
		setSelectAnswerIndex(null);
		setAnswered(false);
		setWasCorrect(null);
	};

	const onReset = () => {
		setScore(0);
		setActiveQuiz(false);
		setIndexQuestion(0);
		setWasCorrect(null);
	};

	return (
		<>
			{activeResults ? (
				<Results
					questionsFiltered={questionsFiltered}
					score={score}
					onReset={onReset}
				/>
			) : (
				<div className='flex flex-col justify-between shadow-md shadow-slate-300 w-full max-w-[600px] h-[600px] p-5 sm:p-10 rounded-lg'>
					<div className='flex justify-between'>
						<span className='text-xl font-bold'>
							{/* Current question number / Total number of questions */}
							{indexQuestion + 1} / {questionsFiltered.length}
						</span>
						<div>
							<span className='font-semibold'>Difficulty: </span>
							<span className='font-bold'>
								{filteredQuestion.difficulty}
							</span>
						</div>
					</div>

					<button
						className='border px-5 py-2 rounded-lg font-bold transition-all hover:bg-yellow-500 hover:text-gray-900'
						onClick={onReset}
					>
						Restart
					</button>
					<div>
						<h1 className='font-bold'>{filteredQuestion.question}</h1>
					</div>

					{/* The answers here */}
					<div
						className={`
							grid gap-5
							grid-cols-1 grid-rows-4
							sm:grid-cols-2 sm:grid-rows-2
						`}
					>
						{/* Mapping an array with correct and incorrect answers */}
						{answersRandom.map((answer, index) => (
							<button
								className={`
									border p-5 rounded-lg flex justify-center items-center hover:scale-105
									${
										selectAnswerIndex !== null &&
										index === selectAnswerIndex
											? answer === filteredQuestion.correct_answer
												? 'bg-green-500'
												: 'bg-red-500'
											: ''
									}
									${
										answered &&
										answer === filteredQuestion.correct_answer &&
										wasCorrect === false &&
										selectAnswerIndex !== null &&
										index !== selectAnswerIndex
											? 'bg-green-200 border-green-500'
											: ''
									}
								`}
								key={answer}
								onClick={() => checkAnswer(answer, index)}
								disabled={answered && selectAnswerIndex !== index}
							>
								<p className='font-medium text-center text-sm'>
									{answer}
								</p>
							</button>
						))}
					</div>

					{/* If the answer was incorrect, show the correct answer */}
					{answered && wasCorrect === false && (
						<div className="mt-3 text-center">
							<span className="text-red-600 font-bold">Correct answer: </span>
							<span className="font-semibold">{filteredQuestion.correct_answer}</span>
						</div>
					)}

					{/* Conditional to show "Next Question" button or "Finish" button */}
					{indexQuestion + 1 === questionsFiltered.length ? (
						<button
							className='border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py-2 hover:bg-yellow-600 hover:text-black font-medium'
							onClick={() => {
								setAnswered(false);
								setActiveResults(true);
								setWasCorrect(null);
							}}
							disabled={!answered}
						>
							Finish
						</button>
					) : (
						<button
							className='border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py-2 hover:bg-yellow-600 hover:text-black font-medium'
							onClick={onNextQuestion}
							disabled={!answered}
						>
							Next Question
						</button>
					)}
				</div>
			)}
		</>
	);
};
