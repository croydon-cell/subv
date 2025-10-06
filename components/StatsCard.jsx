'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function StatsCard({ title, value, icon: Icon, trend, trendValue, subtitle, className, gradient = false }) {
  const isPositiveTrend = trendValue > 0;
  
  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-xl border-0',
      gradient && 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white',
      !gradient && 'bg-white',
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          'text-sm font-medium',
          gradient ? 'text-white/90' : 'text-slate-600'
        )}>
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            'p-2 rounded-lg',
            gradient ? 'bg-white/20' : 'bg-blue-50'
          )}>
            <Icon className={cn(
              'h-4 w-4',
              gradient ? 'text-white' : 'text-blue-600'
            )} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn(
          'text-2xl font-bold',
          gradient ? 'text-white' : 'text-slate-900'
        )}>
          {value}
        </div>
        {(subtitle || trendValue !== undefined) && (
          <div className="flex items-center space-x-2 mt-1">
            {trendValue !== undefined && (
              <span className={cn(
                'text-xs font-medium flex items-center',
                gradient ? 'text-white/80' : isPositiveTrend ? 'text-green-600' : 'text-red-600'
              )}>
                {isPositiveTrend ? '↑' : '↓'} {Math.abs(trendValue)}%
              </span>
            )}
            {subtitle && (
              <p className={cn(
                'text-xs',
                gradient ? 'text-white/70' : 'text-slate-500'
              )}>
                {subtitle}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
