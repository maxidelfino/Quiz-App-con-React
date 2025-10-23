import React from 'react';
import { Link } from 'react-router-dom';
import flagVenezuela from '../assets/symbolsofvenezuela.png'

export const Navbar = () => {
	return (
		<header className='bg-gray-900 py-5 flex justify-center items-center gap-3'>
			<img 
				src={flagVenezuela} 
				alt="Venezuela flag" 
				className="h-8 w-auto object-contain"
			/>
			<Link to='/'>
				<h1 className='text-white text-2xl font-bold hover:scale-110 transition-all duration-500'>
					<span className="text-yellow-400">Quiz</span>{' '}
					<span className="text-blue-600">Venezuelan</span>{' '}
					<span className="text-red-600">App</span>
				</h1>
			</Link>
		</header>
	);
};
