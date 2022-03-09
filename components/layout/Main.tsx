import { FC } from 'react';

interface Props {
  children: JSX.Element;
}

const Main: FC<Props> = (props: Props) => {
  return <div className="container mx-auto mt-3">{props.children}</div>;
};

export default Main;
