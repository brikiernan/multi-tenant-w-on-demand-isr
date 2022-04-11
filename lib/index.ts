import { Site, sites } from '../data';

export const getTime = (): string => {
  const now = new Date();
  return now.toLocaleString();
};

export const getSitePaths = (): string[] => {
  return [
    ...sites.map(({ customDomain }) => customDomain),
    ...sites.map(({ subdomain }) => subdomain),
  ];
};

export const getSite = (site: string): Site | null => {
  const isCustomDomain = site.includes('.');
  let foundSite: Site | undefined = undefined;

  if (isCustomDomain) {
    foundSite = sites.find(({ customDomain }) => customDomain === site);
  } else {
    foundSite = sites.find(({ subdomain }) => subdomain === site);
  }

  if (!foundSite) return null;
  return foundSite;
};
