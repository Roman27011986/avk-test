'use client';

import { outlinedInputClasses } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1440,
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: '#D09768',
				},
				root: {
					[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: '#D09768',
					},
					[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: '#D09768',
						borderWidth: 1,
					},
					'&.Mui-disabled': {
						'& .MuiOutlinedInput-notchedOutline': {
							border: 'none',
							borderRadius: 20,
							borderBottom: '1px solid #cccccc',
						},
					},
					'& .MuiInputLabel-root.Mui-disabled': {
						color: '#ffffff',
					},
					'& .MuiOutlinedInput-input.Mui-disabled': {
						WebkitTextFillColor: '#fff',
					},
				},
			},
		},
	}
};

const theme = createTheme(themeOptions);

export default theme;
