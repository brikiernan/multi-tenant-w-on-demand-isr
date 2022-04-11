import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Site } from '../../../data';
import { getSite, getSitePaths, getTime } from '../../../lib';

type Props = {
  site: Site;
  time: string;
};

type Params = {
  site: string;
};

const SiteHomePage: NextPage<Props> = ({ site, time }) => {
  return (
    <div>
      <div>Time: {time}</div>
      <div>Site Name: {site.name}</div>
    </div>
  );
};

export default SiteHomePage;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const sitePaths = getSitePaths();
  const paths = sitePaths.map(path => ({ params: { site: path } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async context => {
  if (!context.params) throw Error('Missing params.');
  const site = getSite(context.params.site);
  const time = getTime();
  if (!site) return { notFound: true };
  console.log(`getStaticProps() Site ${site.name} at ${time}`);
  return { props: { site, time } };
};
