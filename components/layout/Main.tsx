import { FC } from 'react';

interface Props {
  children: JSX.Element;
}

const Main: FC<Props> = (props: Props) => {
  return (
    <div className="container mx-auto mt-3">
      <div className="w-[750px] mx-auto">{props.children}</div>
    </div>
  );
};

export default Main;
