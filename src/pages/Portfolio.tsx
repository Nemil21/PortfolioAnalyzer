import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StockList from '@/components/dashboard/StockList';
import TopPerformers from '@/components/dashboard/TopPerformers';
import { Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Portfolio = () => {
  const { 
    loading, 
    loadingStocks,
    loadingWatchlist,
    stocks, 
    watchlist
  } = useFinance();

  // Only show full-screen loading on initial load
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-finance-teal animate-pulse"></div>
          <p className="mt-4 text-lg font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <h1 className="text-2xl font-bold mb-6">Portfolio Management</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <StockList 
                stocks={stocks} 
                title="Your Portfolio" 
                type="portfolio"
                loading={loadingStocks}
              />
            </div>
            <div className="space-y-6">
              <TopPerformers stocks={stocks} loading={loadingStocks} />
              <StockList 
                stocks={watchlist} 
                title="Watchlist" 
                icon={<Eye className="h-5 w-5 mr-2" />} 
                type="watchlist"
                loading={loadingWatchlist}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portfolio; 