import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={1}
    width={315}
    height={535}
    viewBox='0 0 315 535'
    backgroundColor='#f2f2f2'
    foregroundColor='#fcfcfc'>
    <circle cx='138' cy='125' r='125' />
    <rect x='0' y='268' rx='10' ry='10' width='280' height='27' />
    <rect x='0' y='314' rx='10' ry='10' width='280' height='88' />
    <rect x='0' y='433' rx='10' ry='10' width='90' height='26' />
    <rect x='127' y='422' rx='20' ry='20' width='153' height='47' />
  </ContentLoader>
);

export default Skeleton;
