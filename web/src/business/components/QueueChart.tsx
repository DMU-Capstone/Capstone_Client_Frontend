import * as React from 'react';
const { useEffect, useRef } = React;
import * as d3 from 'd3';

const dummyData = [
  { hour: 0, waiting: 15, using: 10 },
  { hour: 1, waiting: 28, using: 25 },
  { hour: 2, waiting: 33, using: 35 },
  { hour: 3, waiting: 40, using: 39 },
  { hour: 4, waiting: 55, using: 50 },
];

const QueueChart: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // 초기화

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const x = d3.scaleLinear()
      .domain(d3.extent(dummyData, d => d.hour) as [number, number])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(dummyData, d => Math.max(d.waiting, d.using))!])
      .range([height - margin.bottom, margin.top]);

    const lineWaiting = d3.line<any>()
      .x(d => x(d.hour))
      .y(d => y(d.waiting))
      .curve(d3.curveMonotoneX);

    const lineUsing = d3.line<any>()
      .x(d => x(d.hour))
      .y(d => y(d.using))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(dummyData)
      .attr('fill', 'none')
      .attr('stroke', '#ff6b6b')
      .attr('stroke-width', 2)
      .attr('d', lineWaiting);

    svg.append('path')
      .datum(dummyData)
      .attr('fill', 'none')
      .attr('stroke', '#4dabf7')
      .attr('stroke-width', 2)
      .attr('d', lineUsing);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d}시`));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

  }, []);

  return (
  <svg
    ref={ref}
    width="100%"
    height={300}
    style={{ backgroundColor: '#1e1e1e' }}
  ></svg>
  );
};

export default QueueChart;