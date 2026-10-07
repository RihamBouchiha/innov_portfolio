import Logo from "./Logo";

export default function Header({ children, className }) {
  return (
    <header className={className}>
      <Logo />
      {children}
    </header>
  );
}
