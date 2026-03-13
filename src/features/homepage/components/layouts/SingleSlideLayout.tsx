interface SingleSlideLayoutProps {
  children: React.ReactNode;
}

export function SingleSlideLayout({ children }: SingleSlideLayoutProps) {
  return <div className="w-full">{children}</div>;
}
