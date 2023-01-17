import React from 'react';

type ILoader = {
	full?: boolean;
};

const Loader = ({ full }: ILoader) => {
	return (
		<div className={`flex ${full ? 'h-screen w-screen' : 'h-full w-full'}   flex-col items-center justify-center`}>
			<div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-pink-500 shadow-md"></div>
			<p className="animate-pulse">Waiting...</p>
		</div>
	);
};

export default Loader;
