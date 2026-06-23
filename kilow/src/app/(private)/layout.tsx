'use client';
import Header from '@/components/header';
import { colors } from '@/components/theme';
import { PrivateLayout } from './style';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: colors.backgroundGray,
      }}
    >
      <Header />
      <PrivateLayout>{children}</PrivateLayout>
    </div>
  );
}
