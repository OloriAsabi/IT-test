import "./Home.css";
import * as d3 from "d3";
import {  useState , useEffect } from "react";
import { Button } from "@mui/material";


const Home = () => {
  
  const [barData,setBarData] = useState([
    500, 150 ,170 ,180 ,200,475
  ]);
    const  drawChart = (barData) => {
      //svg conatiner
      const width = 500;
      const height = 400;
      var svg = d3.selectAll(".chart__bar")
      .append("svg")
      .attr("width",width)
      .attr("height",height)
      .style("overflow","visible")
      .style("margin-bottom","20px")
      .style("margin-top","10px");
      // scaling
      const scaleX = d3.scaleBand()
      .domain(barData.map((val , i) => i))
      .range([0 ,width])
      
  
      const scaleY = d3.scaleLinear()
      .domain([0 ,height])
      .range([height ,0]);
  
  // axis
      const  axisX = d3.axisBottom(scaleX)
      .ticks(barData.length);
      const  axisY = d3.axisLeft(scaleY)
      .ticks(10);
      svg.append("g")
      .call(axisX)
      .attr('transform',`translate(0 ,${height})`);
  
      svg.append("g")
      .call(axisY);
  
      // svg data]
      
       svg.selectAll(".bar")
      .data(barData)
      .join("rect")
      .attr("fill" ,"rgb(53, 122, 232)")
      .attr("stroke" ,"#F5EFD")
      .attr("x",(val ,i ) => scaleX(i))
      .attr("y",scaleY)
      .attr("width", scaleX.bandwidth())
      .attr("height",val => height - scaleY(val));
    } 
 
  const  handleClick = () =>{
    d3.selectAll("svg").remove();
    const  data = Array(6)
                  .fill()
                  .map(() => Math.floor(Math.random() *350));
 
    setBarData(data);
    setTimeout(() =>{
    drawChart(barData);
    },200);
  }
  useEffect(() =>{
     //svg conatiner
     const width = 500;
     const height = 400;
     var svg = d3.select("svg")
     .attr("width",width)
     .attr("height",height)
     .style("overflow","visible")
     .style("margin-bottom","10px")
     .style("margin-top","15px");
     // scaling
     const scaleX = d3.scaleBand()
     .domain(barData.map((val , i) => i))
     .range([0 ,width])
     
     
 
     const scaleY = d3.scaleLinear()
     .domain([0 ,height])
     .range([height ,0]);
 
 // axis
     const  axisX = d3.axisBottom(scaleX)
     .ticks(barData.length);
     const  axisY = d3.axisLeft(scaleY)
     .ticks(10);
     svg.append("g")
     .call(axisX)
     .attr('transform',`translate(0 ,${height})`);
 
     svg.append("g")
     .call(axisY);
 
     // svg data]
     
      svg.selectAll(".bar")
     .data(barData)
     .join("rect")
     .attr("fill" ,"#6eb5f2b8")
     .attr("stroke" ,"#545454")
     .attr("x",(val ,i ) => scaleX(i))
     .attr("y",scaleY)
     .attr("width", scaleX.bandwidth())
     .attr("height",val => height - scaleY(val));

  },[barData]);
  return (
    <div>
      <div className="chart__container">
          <div className="chart__bar">
              <svg id="sv" className="chart__svg"></svg>
              <Button variant="contained" type="submit" size='samll' className="chart__button" color="primary"  onClick={handleClick}>
             Click Here
            </Button>
          </div>
      </div>
    </div>
  )
}

export default Home