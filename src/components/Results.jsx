import React from 'react';

export const Results = ({ score, questionsFiltered, onReset }) => {
	return (
		<div className="flex flex-col justify-evenly items-center shadow-xl rounded-lg w-full max-w-[95vw] sm:max-w-[450px] md:max-w-[600px] h-[80vh] max-h-[95vw] sm:max-h-[500px] md:max-h-[600px] gap-5 p-4 sm:p-7 bg-white">
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Resultados</h1>

			<div className="flex flex-col gap-3 sm:gap-5 text-center text-base sm:text-lg font-bold">
				<span>Acertaste</span>
				<span className="font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl animate-pulse">
					{((score / questionsFiltered.length) * 100).toFixed(0)}%
				</span>
				<span>
					de las preguntas ({score} de {questionsFiltered.length})
				</span>
			</div>

			<button
				className="border px-4 py-2 sm:px-5 sm:py-2 rounded-lg transition-all font-bold hover:bg-yellow-500 hover:text-gray-900"
				onClick={onReset}
			>
				Vamos de nuevo
			</button>
		</div>
	);
};
