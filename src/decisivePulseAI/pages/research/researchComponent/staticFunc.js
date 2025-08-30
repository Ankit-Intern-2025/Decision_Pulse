export const prePareChartsData = (data) => {
    return data.map((chart) => {
      const defaultKey = chart.filters?.default;
      const defaultSeriesRaw = chart.allSeries?.[defaultKey];
  
      let initialSeries = chart.series;
      let initialOptions = chart.options;
  
      if (Array.isArray(defaultSeriesRaw)) {
        // Case: allSeries["default"] is an array of series (like 'yoy-sales')
        initialSeries = defaultSeriesRaw;
      } else if (defaultSeriesRaw?.series) {
        // Case: allSeries["default"] is an object with series and options (like 'units-sold')
        initialSeries = defaultSeriesRaw.series;
        initialOptions = {
          ...chart.options,
          ...defaultSeriesRaw.options,
        };
      }
      return {
        ...chart,
        selectedFilter: defaultKey || null,
        series: initialSeries,
        options: initialOptions,
      };
    });
  };

export const filterChartData = (chartId, value, data, setData)=>{
    const updated = data.map((chart) => {
        if (chart.id !== chartId) return chart;
    
        const newSeriesRaw = chart.allSeries?.[value];
    
        let updatedSeries = chart.series;
        let updatedOptions = chart.options;
    
        if (Array.isArray(newSeriesRaw)) {
          // Case: allSeries is just an array of series (like yoy-sales or channel-sales)
          updatedSeries = newSeriesRaw;
        } else if (newSeriesRaw?.series) {
          // Case: allSeries is an object with series and options (like units-sold)
          updatedSeries = newSeriesRaw.series;
          updatedOptions = {
            ...chart.options,
            ...newSeriesRaw.options,
          };
        }
    
        return {
          ...chart,
          selectedFilter: value,
          series: updatedSeries,
          options: updatedOptions
        };
      });
    
      setData(updated);

}