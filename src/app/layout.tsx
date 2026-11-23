import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import '../styles/home.css';
import '../styles/inner.css';
import RouteEffects from '@/components/RouteEffects';

export const metadata: Metadata = {metadataBase: new URL('https://sprroofing.com.au')};
export default function RootLayout({children}:{children:ReactNode}){
 return <html lang="en-AU"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet"/></head><body><RouteEffects/>{children}</body></html>;
}
