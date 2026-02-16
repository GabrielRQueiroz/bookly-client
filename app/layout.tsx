import {
  ColorSchemeScript,
  createTheme,
  MantineColorsTuple,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bookly',
  description: 'Gerencie suas estantes de livros ✨',
};

const primary: MantineColorsTuple = [
  '#f6eeff',
  '#e7d9f7',
  '#cab1ea',
  '#ad86dd',
  '#9462d2',
  '#854bcb',
  '#7d3fc9',
  '#6b31b2',
  '#5f2ba0',
  '#52238d',
];

const theme = createTheme({
  colors: {
    primary,
  },
  primaryColor: 'primary',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase`}
      >
        <div className="flex h-screen w-full bg-gray-50 overflow-y-auto">
          <MantineProvider theme={theme}>
            <Notifications position="top-center" />
            {children}
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
