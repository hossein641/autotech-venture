export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const navigationData = {
  mainNavigation: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/#services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'team', label: 'Team', href: '/team' },
    { id: 'blog', label: 'Blog', href: '/blog' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ] as const
} as const;
