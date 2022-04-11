import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getTime } from '../../../lib';

type PostProps = {
  site: string;
  slug: string;
  time: string;
};

const SitePostPage: NextPage<PostProps> = ({ site, slug, time }) => {
  return (
    <div>
      <div>Time: {time}</div>
      <div>Site: {site}</div>
      <div>Slug: {slug}</div>
    </div>
  );
};

export default SitePostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { site: 'demo', slug: 'asdf' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw Error('Missing params.');
  const { site, slug } = params;
  const time = getTime();
  console.log(`getStaticProps() Post ${site}/${slug} at ${time}`);
  return { props: { site, slug, time } };
};
