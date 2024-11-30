export const BannerColors = {
	default: {
		first:
			'linear-gradient(90deg, rgba(98,135,179,1) 0%, rgba(50,130,189,1) 51%, rgba(0,212,255,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(98,135,179,1) 51%, rgba(50,130,189,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(50,130,189,1) 0%, rgba(0,212,255,1) 51%, rgba(98,135,179,1) 100%)',
	},
	orange: {
		first:
			'linear-gradient(90deg, rgba(255,159,64,1) 0%, rgba(255,127,80,1) 51%, rgba(255,69,0,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(255,69,0,1) 0%, rgba(255,159,64,1) 51%, rgba(255,127,80,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(255,127,80,1) 0%, rgba(255,69,0,1) 51%, rgba(255,159,64,1) 100%)',
	},
	purple: {
		first:
			'linear-gradient(90deg, rgba(230,230,250,1) 0%, rgba(147,112,219,1) 51%, rgba(128,0,128,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(128,0,128,1) 0%, rgba(230,230,250,1) 51%, rgba(147,112,219,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(147,112,219,1) 0%, rgba(128,0,128,1) 51%, rgba(230,230,250,1) 100%)',
	},
	green: {
		first:
			'linear-gradient(90deg, rgba(144,238,144,1) 0%, rgba(60,179,113,1) 51%, rgba(46,139,87,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(46,139,87,1) 0%, rgba(144,238,144,1) 51%, rgba(60,179,113,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(60,179,113,1) 0%, rgba(46,139,87,1) 51%, rgba(144,238,144,1) 100%)',
	},
	red: {
		first:
			'linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(220,20,60,1) 51%, rgba(139,0,0,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(139,0,0,1) 0%, rgba(255,192,203,1) 51%, rgba(220,20,60,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(220,20,60,1) 0%, rgba(139,0,0,1) 51%, rgba(255,192,203,1) 100%)',
	},
	pink: {
		first:
			'linear-gradient(90deg, rgba(255,182,193,1) 0%, rgba(255,105,180,1) 51%, rgba(219,112,147,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(219,112,147,1) 0%, rgba(255,182,193,1) 51%, rgba(255,105,180,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(255,105,180,1) 0%, rgba(219,112,147,1) 51%, rgba(255,182,193,1) 100%)',
	},
	darkPurple: {
		first:
			'linear-gradient(90deg, rgba(68,29,120,1) 0%, rgba(129,36,141,1) 51%, rgba(192,44,198,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(192,44,198,1) 0%, rgba(68,29,120,1) 51%, rgba(129,36,141,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(129,36,141,1) 0%, rgba(192,44,198,1) 51%, rgba(68,29,120,1) 100%)',
	},
}

export enum BannerColorsEnum {
	DEFAULT = 'default',
	ORANGE = 'orange',
	PURPLE = 'purple',
	GREEN = 'green',
	RED = 'red',
	PINK = 'pink',
	DARK_PURPLE = 'darkPurple',
}

export const BannerColorsSelectOptions = [
	{ value: BannerColorsEnum.DEFAULT, label: 'Default' },
	{ value: BannerColorsEnum.PURPLE, label: 'Purple' },
	{ value: BannerColorsEnum.DARK_PURPLE, label: 'Dark Purple' },
	{ value: BannerColorsEnum.ORANGE, label: 'Orange' },
	{ value: BannerColorsEnum.GREEN, label: 'Green' },
	{ value: BannerColorsEnum.RED, label: 'Red' },
	{ value: BannerColorsEnum.PINK, label: 'Pink' },
]

export function getBannerColorEnum(serverColor: {
	first: string
	second: string
	third: string
}): BannerColorsEnum {
	for (const [key, value] of Object.entries(BannerColors)) {
		if (
			value.first === serverColor.first &&
			value.second === serverColor.second &&
			value.third === serverColor.third
		) {
			return key as BannerColorsEnum
		}
	}
	return BannerColorsEnum.DEFAULT
}
