/**
 * Performance monitoring utilities
 */

export function measurePageLoad() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  return {
    pageLoadTime,
    connectTime,
    renderTime,
  };
}

export function logPerformance() {
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = measurePageLoad();
        if (metrics) {
          console.log('Performance Metrics:', {
            'Page Load Time': `${metrics.pageLoadTime}ms`,
            'Connect Time': `${metrics.connectTime}ms`,
            'Render Time': `${metrics.renderTime}ms`,
          });
        }
      }, 0);
    });
  }
}

/**
 * Report Web Vitals (for future analytics integration)
 */
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
  
  // Future: Send to analytics
  // if (window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.value),
  //     event_label: metric.id,
  //     non_interaction: true,
  //   });
  // }
}
