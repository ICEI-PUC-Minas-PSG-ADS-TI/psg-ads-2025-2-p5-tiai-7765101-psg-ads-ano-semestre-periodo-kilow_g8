export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body style={{ width: '100vw', height: '100vh' }}>
        <div>{children}</div>
      </body>
    </html>
  );
}
