import type { GetStaticProps, NextPage } from 'next';
import { getTime } from '../lib';

const HomePage: NextPage<{ time: string }> = ({ time }) => {
  return <div>HomePage time: {time}</div>;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const time = getTime();
  console.log('[HomePage] getStaticProps() at', time);
  return { props: { time } };
};
