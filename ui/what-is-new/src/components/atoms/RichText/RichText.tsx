import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { PropsWithChildren } from 'react';

const Typography1 = ({ children }: PropsWithChildren<HTMLHeadingElement>) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

const Typography2 = ({ children }: PropsWithChildren<HTMLHeadingElement>) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

const Typography3 = ({ children }: PropsWithChildren<HTMLHeadingElement>) => {
  return <h3 className="text-lg font-medium">{children}</h3>;
};

const Link = ({ children, href }: PropsWithChildren<HTMLLinkElement>) => {
  return (
    <a className="text-blue-700" href={href}>
      {children}
    </a>
  );
};

type RichTextProps = {
  options?: MarkdownToJSX.Options;
  markdown: string;
};

export const RichText = ({ options, markdown }: RichTextProps) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: Typography1
          },
          h2: {
            component: Typography2
          },
          h3: {
            component: Typography3
          },
          a: {
            component: Link
          },
          ...options?.overrides
        },
        ...options
      }}
    >
      {markdown}
    </Markdown>
  );
};
