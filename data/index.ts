type Post = {
  id: number;
  content: string;
  slug: string;
};

export type Site = {
  id: number;
  customDomain: string;
  subdomain: string;
  content: string;
  name: string;
  posts: Post[];
};

export const sites: Site[] = [
  {
    id: 1,
    subdomain: 'site1',
    customDomain: 'site1.com',
    content: 'Site 1 content...',
    name: 'Site 1',
    posts: [
      { id: 1, content: 'Site 1 post 1 content...', slug: 'post1' },
      { id: 2, content: 'Site 1 post 2 content...', slug: 'post2' },
    ],
  },
  {
    id: 2,
    subdomain: 'site2',
    customDomain: 'site2.com',
    content: 'Site 2 content...',
    name: 'Site 2',
    posts: [
      { id: 1, content: 'Site 2 post 1 content...', slug: 'post1' },
      { id: 2, content: 'Site 2 post 2 content...', slug: 'post2' },
    ],
  },
  {
    id: 3,
    subdomain: 'site3',
    customDomain: 'site3.com',
    content: 'Site 3 content...',
    name: 'Site 3',
    posts: [
      { id: 1, content: 'Site 3 post 1 content...', slug: 'post1' },
      { id: 2, content: 'Site 3 post 2 content...', slug: 'post2' },
    ],
  },
  {
    id: 4,
    subdomain: 'site4',
    customDomain: 'site4.com',
    content: 'Site 4 content...',
    name: 'Site 4',
    posts: [
      { id: 1, content: 'Site 4 post 1 content...', slug: 'post1' },
      { id: 2, content: 'Site 4 post 2 content...', slug: 'post2' },
    ],
  },
];
