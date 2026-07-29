// Cancel the pt-[72px] from root layout since the navbar is hidden on /login
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="-mt-[72px]">{children}</div>;
}
