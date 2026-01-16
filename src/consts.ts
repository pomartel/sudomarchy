// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

interface SocialLink {
  href: string;
  label: string;
}

interface Site {
  website: string;
  author: string;
  profile: string;
  desc: string;
  longDesc: string;
  title: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  scheduledPostMargin: number;
  editPost: {
    enabled: boolean;
    text: string;
    url: string;
  };
  dynamicOgImage: boolean;
  lang: string;
  timezone: string;
}

// Site configuration
export const SITE: Site = {
  website: "https://sudomarchy.com/",
  author: "Pierre Olivier Martel",
  profile: "https://sudomarchy.com/about",
  desc: "My Omarchy & Hyprland tweaks",
  longDesc: "A blog where I share my Omarchy & Hyprland tips and customizations.",
  title: "sudomarchy",
  ogImage: "avatar.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  scheduledPostMargin: 15 * 60 * 1000,
  editPost: {
    enabled: false,
    text: "Edit on GitHub",
    url: "https://github.com/pomartel/sudomarchy/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "America/Toronto",
};

export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.desc;

// Navigation links
export const NAV_LINKS: SocialLink[] = [
  {
    href: "/",
    label: "Blog",
  },
  {
    href: "/about",
    label: "About",
  },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/pomartel",
    label: "GitHub",
  },
  {
    href: "https://x.com/sudomarchy",
    label: "Twitter",
  },
  {
    href: "/rss.xml",
    label: "RSS",
  },
];

// Icon map for social media
export const ICON_MAP: Record<string, string> = {
  GitHub: "github",
  Twitter: "twitter",
  RSS: "rss",
  Email: "mail",
};
