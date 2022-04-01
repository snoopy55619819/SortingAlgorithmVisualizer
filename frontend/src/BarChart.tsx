import useD3 from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function BarChart({ data }: any) {
  const ref = useD3(
    (svg: any) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d: any) => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        // @ts-ignore
        .domain([0, d3.max(data, (d) => d.sales)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g: any) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              // @ts-ignore
              d3
              // @ts-ignore
                .ticks(...d3.extent(x.domain()), width / 40)
                // @ts-ignore
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );
// @ts-ignore
      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          // @ts-ignore
          .call((g) => g.select(".domain").remove())
          // @ts-ignore
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        // @ts-ignore
        .attr("x", (d) => x(d.year))
        .attr("width", x.bandwidth())
        // @ts-ignore
        .attr("y", (d) => y1(d.sales))
        // @ts-ignore
        .attr("height", (d) => y1(0) - y1(d.sales));
    },
    [data.length]
  );

  return (
    <svg
    // @ts-ignore
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;