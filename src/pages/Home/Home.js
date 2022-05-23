import './Home.css';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3"
import { Button } from '@mui/material';

function Home() {

    //  1] Setup Initial data and settings ------------//

    const initialData = [
      {
        name: "Monday",
        value: 10,
      },
      {
        name: "Tuesday",
        value: 3,
      },
      {
        name: "Wednesday",
        value: 9,
      },
      {
        name: "thursday",
        value: 7,
      },
      {
        name: "Friday",
        value: 7,
      },
    ];

    const width = 500;
    const height = 250;
    const padding = 30;
    const maxValue = 20; // Maximum data value
  
    const [chartdata,setChartdata] = useState(initialData)
 
    const svgRef= useRef()

  //  2] Setup random data generator and SVG canvas -//
    const newData = () => chartdata.map(
      function (d) {
        d.value = Math.floor(
          Math.random() * (maxValue + 1)
        )
        return d
      } 
    )

      useEffect(
        ()=>{ 
          
        //  3] Setup functions for Scales ------------------//
          
            //xscales
            const xScale = d3.scaleBand()
                            .domain(chartdata.map( (d) => d.name ))
                            .rangeRound([(0+padding),(width - padding)])         

            //Yscales
            const yScale = d3.scaleLinear()
                             .domain([0, d3.max( chartdata, function (d) {return d.value})])
                             .range([(height - padding), (0 + padding)])

        //  4] Setup functions to draw Lines ---------------//

            const line = d3.line()
                           .x((d)=> xScale(d.name))
                           .y( (d)=>yScale(d.value) )
                           .curve(d3.curveMonotoneX)        

        //  5] Draw line        ---------------------------//
           d3.select(svgRef.current)
              .select('path')
              .attr('d', (value) => line(chartdata))
              .attr('fill','none')
              .attr('stroke', 'white')

        //  6] Setup functions to draw X and Y Axes --------//
           const xAxis = d3.axisBottom(xScale)
           const yAxis = d3.axisLeft(yScale)

        //  7] Draw x and y Axes   -------------------------//
           d3.select('#xaxis').remove()
           d3.select(svgRef.current)
              .append('g')
              .attr('transform',`translate(0,${height - padding})`)
              .attr('id','xaxis')
              .call(xAxis)
            
          d3.select('#yaxis').remove()
          d3.select(svgRef.current)
              .append('g')
              .attr('transform',`translate(${padding},0)`)
              .attr('id','yaxis')
              .call(yAxis)   

        },[chartdata]
      )



  return (
    <div>
      <header className="App-header App">

        <svg id="chart" ref={svgRef} className="App-header App" viewBox="0 0 500 150">

            <path d="" fill="none" stroke="white" strokeWidth="5" />
            
        </svg>
        <p>
          <Button variant="contained" className='btn' size='small' color="primary" 
          type='button' onClick={()=> setChartdata(newData())}>
                Click to refresh data
          </Button>
        </p>

      </header>
    </div>
  );
}

export default Home;


// import React from 'react'
// import * as d3 from "d3"
// import './Home.css';

// export default function Home() {
  
   
// function main() {
// 	var svg = d3.select("svg"),
//         margin = 200,
//         width = svg.attr("width") - margin,
//         height = svg.attr("height") - margin;

//     svg.append("text")
//        .attr("transform", "translate(100,0)")
//        .attr("x", 50)
//        .attr("y", 50)
//        .attr("font-size", "24px")
//        .text("Stock Price")

//     var xScale = d3.scaleBand().range([0, width]).padding(0.4),
//         yScale = d3.scaleLinear().range([height, 0]);

//     var g = svg.append("g")
//             .attr("transform", "translate(" + 100 + "," + 100 + ")");

//     d3.csv("../data/stock_values.csv").then( function(data) {
//         xScale.domain(data.map(function(d) { return d.year; }));
//         yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

//         g.append("g")
//          .attr("transform", "translate(0," + height + ")")
//          .call(d3.axisBottom(xScale))
//          .append("text")
//          .attr("y", height - 250)
//          .attr("x", width - 100)
//          .attr("text-anchor", "end")
//          .attr("stroke", "black")
//          .text("Year");

//         g.append("g")
//          .call(d3.axisLeft(yScale).tickFormat(function(d){return "$" + d;}).ticks(10))
// 	 .append("text")
// 	 .attr("transform", "rotate(-90)")
// 	 .attr("y", 10)
// 	 .attr('dy', '-5em')
// 	 .attr('text-anchor', 'end')
// 	 .attr('stroke', 'black')
// 	 .text('Stock Price in USD')

//         g.selectAll(".bar")
//          .data(data)
//          .enter().append("rect")
//          .attr("class", "bar")
// 	 .on("mouseover", onMouseOver) // Add listener for event
// 	 .on("mouseout", onMouseOut)
//          .attr("x", function(d) { return xScale(d.year); })
//          .attr("y", function(d) { return yScale(d.value); })
//          .attr("width", xScale.bandwidth())
// 	 .transition()
// 	 .ease(d3.easeLinear)
// 	 .duration(500)
// 	 .delay(function(d,i){ return i * 50})
//          .attr("height", function(d) { return height - yScale(d.value); });
// 	})
       
// 	// Mouseover event handler

// 	function onMouseOver(d, i) {
// 		// Get bar's xy values, ,then augment for the tooltip
// 		var xPos = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
// 		var yPos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

// 		// Update Tooltip's position and value
// 		d3.select('#tooltip')
// 			.style('left', xPos + 'px')
// 			.style('top', yPos + 'px')
// 			.select('#value').text(i.value)
		
// 		d3.select('#tooltip').classed('hidden', false);


// 		d3.select(this).attr('class','highlight')
// 		d3.select(this)
// 			.transition() // I want to add animnation here
// 			.duration(500)
// 			.attr('width', xScale.bandwidth() + 5)
// 			.attr('y', function(d){return yScale(d.value) - 10;})
// 			.attr('height', function(d){return height - yScale(d.value) + 10;})

// 	}

// 	// Mouseout event handler
// 	function onMouseOut(d, i){
// 		d3.select(this).attr('class','bar')
// 		d3.select(this)
// 			.transition()
// 			.duration(500)
// 			.attr('width', xScale.bandwidth())
// 			.attr('y', function(d){return yScale(d.value);})
// 			.attr('height', function(d) {return height - yScale(d.value)})
		
// 		d3.select('#tooltip').classed('hidden', true);
// 	}
// }

// return (
//       <div  onLoad={main}>
//         <div id="tooltip" className="hidden">
//             <p><strong>Bar Value</strong></p>
//             <p><span id="value">1</span></p>
//       </div>
//       </div>
// )
// }
