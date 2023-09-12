import * as React from 'react';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return <div className="text-lg bold">Hello, I am Home Page</div>;
};

export default Home;
