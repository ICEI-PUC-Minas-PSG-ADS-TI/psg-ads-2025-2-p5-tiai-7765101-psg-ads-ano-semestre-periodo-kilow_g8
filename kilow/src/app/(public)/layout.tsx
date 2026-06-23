export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      {children}
    </div>
  );
}
