import { SITE } from "./consts";

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/pomartel",
    linkTitle: ` ${SITE.author} on Github`,
    icon: "github",
    active: true,
  },
  {
    name: "X",
    href: "https://x.com/sudomarchy",
    linkTitle: `${SITE.author} on X`,
    icon: "twitter",
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pomartel/",
    linkTitle: `${SITE.author} on LinkedIn`,
    icon: "linkedin",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:pomartel@coderubik.com",
    linkTitle: `Send an email to ${SITE.author}`,
    icon: "mail",
    active: true,
  },
] as const;
