export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}



export const navigationData = {
  mainNavigation: [
    { id: 'home', label: 'Home', href: '/' },
    { 
      id: 'services', 
      label: 'Services', 
      href: '/services',
      dropdown: [
        { id: 'ai-solutions', label: 'AI Solutions', href: '/ai-solutions-dayton' },
        { id: 'web-design', label: 'Web Design', href: '/web-design-dayton' },
        { id: 'seo-services', label: 'SEO Services', href: '/seo-services-dayton' },
        { id: 'ai-consultant', label: 'AI Consulting', href: '/ai-consultant-dayton' },
        { id: 'automation', label: 'Process Automation', href: '/process-automation-dayton' }
      ]
    },
    { id: 'blog', label: 'Blog', href: '/blog' },
    { id: 'team', label: 'Team', href: '/team' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]
} as const;