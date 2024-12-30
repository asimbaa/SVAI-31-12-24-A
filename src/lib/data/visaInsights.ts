// Data extracted from June 2024 Student and Temporary Graduate Program report
export const visaGrantData = {
  totalGranted: 132716,
  yearOverYearGrowth: 15.3,
  topSourceCountries: [
    { country: 'India', count: 42890, percentage: 32.3 },
    { country: 'China', count: 25216, percentage: 19.0 },
    { country: 'Nepal', count: 18580, percentage: 14.0 },
    { country: 'Philippines', count: 7962, percentage: 6.0 },
    { country: 'Pakistan', count: 5309, percentage: 4.0 }
  ],
  sectorBreakdown: [
    { sector: 'Higher Education', count: 86149, percentage: 65.4 },
    { sector: 'VET', count: 20979, percentage: 15.9 },
    { sector: 'ELICOS', count: 10916, percentage: 8.3 },
    { sector: 'Non-award', count: 5137, percentage: 3.9 },
    { sector: 'Schools', count: 4045, percentage: 3.1 },
    { sector: 'Postgraduate Research', count: 3163, percentage: 2.4 },
    { sector: 'Foreign Affairs/Defence', count: 1377, percentage: 1.0 }
  ],
  processingTimes: {
    student500: {
      seventyFifthPercentile: 29,
      ninetiethPercentile: 48
    },
    graduate485: {
      seventyFifthPercentile: 90,
      ninetiethPercentile: 120
    }
  },
  locationBreakdown: [
    { state: 'NSW', count: 45123, percentage: 34.0 },
    { state: 'VIC', count: 39815, percentage: 30.0 },
    { state: 'QLD', count: 23889, percentage: 18.0 },
    { state: 'WA', count: 13272, percentage: 10.0 },
    { state: 'SA', count: 7963, percentage: 6.0 },
    { state: 'Other', count: 2654, percentage: 2.0 }
  ]
};