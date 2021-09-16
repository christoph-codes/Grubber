import React, { createContext, useState } from 'react';
import initialGrubs from '../util/grubs';

export const GrubContext = createContext();

const GrubProvider = ({ children }) => {
	const [grubs, setGrubs] = useState(initialGrubs);
	console.log(initialGrubs);

	const postGrub = (grub) => {
		const newGrub = {
			...grub,
			updated: new Date(),
		};
		console.log(newGrub);
		setGrubs((prev) => {
			return [...prev, newGrub];
		});
	};

	return (
		<GrubContext.Provider value={{ grubs, postGrub }}>
			{children}
		</GrubContext.Provider>
	);
};

export default GrubProvider;
