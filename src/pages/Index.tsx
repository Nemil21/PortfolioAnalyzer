import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PortfolioValue from '@/components/dashboard/PortfolioValue';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';
import SectorBreakdown from '@/components/dashboard/SectorBreakdown';
import TopPerformers from '@/components/dashboard/TopPerformers';
import PortfolioChartCard from '@/components/dashboard/PortfolioChartCard';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { 
    loading, 
    loadingStocks,
    loadingSummary,
    stocks, 
    performanceData, 
    sectorData, 
    portfolioSummary 
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
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {loadingSummary ? (
              <Skeleton className="h-[300px] w-full rounded-lg" />
            ) : (
              <PortfolioValue 
                totalValue={portfolioSummary.totalValue}
                totalProfit={portfolioSummary.totalProfit}
                totalProfitPercent={portfolioSummary.totalProfitPercent}
                historicalData={performanceData.monthly}
              />
            )}
            
            {loadingSummary ? (
              <Skeleton className="h-[300px] w-full rounded-lg" />
            ) : (
              <PerformanceMetrics performanceData={performanceData} />
            )}
            
            {loadingSummary ? (
              <Skeleton className="h-[300px] w-full rounded-lg" />
            ) : (
              <SectorBreakdown 
                sectorData={sectorData}
                loading={loadingSummary}
              />
            )}
          </div>
          
          <div className="mb-4">
            {loadingSummary ? (
              <Skeleton className="h-[450px] w-full rounded-lg" />
            ) : (
              <PortfolioChartCard performanceData={performanceData} />
            )}
          </div>
          
          <div className="mb-4">
            <TopPerformers stocks={stocks} loading={loadingStocks} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
