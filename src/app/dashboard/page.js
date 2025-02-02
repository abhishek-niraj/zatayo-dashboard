'use client';
import { useMemo } from 'react';
import SportsPage from './sports/page';

export default function DashboardPage() {
  // Memoize SportsPage to avoid unnecessary re-renders
  const sportsPage = useMemo(() => <SportsPage />, []);
  console.log('Rendering DashboardPage');
  return sportsPage;
}
