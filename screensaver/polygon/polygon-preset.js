
//
//	Polygon presets
//



export const nonagon = {

	polygon : {
		sides			: 9,
		pointStep		: 1,
		startDivision	: 1,
		radius			: 1000,
		copies			: 1,
		copyOffset		: 1,
		copyPaths		: 'separate',
		coordinates		: 'absolute',
		decimalPlaces	: 0,
	}

};



export const diPentagram = {

	polygon : {
		sides			: 5,
		pointStep		: 3,
		startDivision	: 1,
		radius			: 1000,
		copies			: 2,
		copyOffset		: 2,
		copyPaths		: 'separate',
		coordinates		: 'absolute',
		decimalPlaces	: 0,
	}

};



export const diHeptagram = {

	polygon : {
		sides			: 7,
		pointStep		: 3,
		startDivision	: 1,
		radius			: 1000,
		copies			: 2,
		copyOffset		: 2,
		copyPaths		: 'separate',
		coordinates		: 'absolute',
		decimalPlaces	: 0,
	},

};




export const triHeptadecagram = {

	polygon : {
		sides			: 17,
		pointStep		: 8,
		startDivision	: 2,
		radius			: 1100,
		copies			: 3,
		copyOffset		: 4,
		copyPaths		: 'separate',
		coordinates		: 'absolute',
		decimalPlaces	: 0,
	},

};


export const defaultStyle = {
	style : {
		colourScheme	: 'light',
		startColour		: 'orange',
		fillOpacity		: '0.5',
		fullRule		: 'evenodd',
		strokeWidth		: '7px',
		strokeDasharray	: '27px 27px',
		antCrawl		: false,
		grid			: true,
		//markers: false,
	},
}

export const disco = {

	style : {
		colourScheme	: 'disco',
		startColour		: 'forestgreen',
		fillOpacity		: '0.2',
		fullRule		: 'evenodd',
		strokeWidth		: '7ex',
		strokeDasharray	: '4px 4em',

		strokeLinejoin	: 'miter',
		strokeLinecap	: 'butt',

		antCrawl		: true,
		grid			: false,
		//markers: false,
	},

};



