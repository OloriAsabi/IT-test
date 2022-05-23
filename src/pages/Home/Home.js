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
