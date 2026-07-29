// The proposal page hides the global navbar, so we cancel the pt-[72px]
// added by the root layout wrapper.
export default function PropuestaLayout({ children }: { children: React.ReactNode }) {
  return <div className="-mt-[72px]">{children}</div>;
}
