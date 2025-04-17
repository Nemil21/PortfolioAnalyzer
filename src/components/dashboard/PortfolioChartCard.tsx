import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceData } from '@/data/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import PerformanceChart from './PerformanceChart';

interface PortfolioChartCardProps {
  performanceData: PerformanceData;
  loading?: boolean;
}

const PortfolioChartCard: React.FC<PortfolioChartCardProps> = ({ 
  performanceData,
  loading = false
}) => {
  // Loading skeleton
  if (loading) {
    return <Skeleton className="h-[450px] w-full rounded-lg" />;
  }
  
  return (
    <Card className="glass h-full animate-fade-in animate-delay-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <PerformanceChart data={performanceData} />
      </CardContent>
    </Card>
  );
};

export default PortfolioChartCard; 