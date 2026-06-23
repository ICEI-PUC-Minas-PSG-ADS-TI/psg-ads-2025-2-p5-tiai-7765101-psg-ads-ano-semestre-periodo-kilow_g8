import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { GlobalToastProvider } from '@/components/toasts';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KiloW',
  description: 'Gestão de contas de luz e dispositivos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={montserrat.className}
    >
      <body>
        <GlobalToastProvider>{children}</GlobalToastProvider>
      </body>
    </html>
  );
}
