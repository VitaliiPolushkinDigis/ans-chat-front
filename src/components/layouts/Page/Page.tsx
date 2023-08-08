import { FC, ReactNode } from 'react';
import { classes, Root } from './Page.helper';

interface PageProps {
  children: ReactNode;
  display?: string;
  justifyContent?: string;
  background?: string;
}

const Page: FC<PageProps> = ({
  children,
  display = 'block',
  background = '#fff',
  justifyContent = 'center',
}) => {
  return (
    <Root
      display={display}
      justifyContent={justifyContent}
      background={background}
      className={classes.root}
    >
      {children}
    </Root>
  );
};

export default Page;
