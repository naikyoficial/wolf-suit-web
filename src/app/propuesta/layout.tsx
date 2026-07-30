export default function PropuestaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .site-header, footer { display: none !important; }
      `}</style>
      <div className="-mt-[72px]">{children}</div>
    </>
  );
}
