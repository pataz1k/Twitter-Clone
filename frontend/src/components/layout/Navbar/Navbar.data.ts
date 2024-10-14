import { INavbar } from './navbar.interface'

export const NavbarData: INavbar = {
	items: [
		{
			icon: 'MdHome',
			title: 'Home',
			link: '/',
		},
		{
			icon: 'MdSearch',
			title: 'Explore',
			link: '/explore',
		},
		{
			icon: 'MdNotifications',
			title: 'Notifications',
			link: '/notifications',
		},
		{
			icon: 'MdMail',
			title: 'Messages',
			link: '/messages',
		},
		{
			icon: 'MdAccountCircle',
			title: 'Profile',
			link: '/profile',
		},
	],
}
