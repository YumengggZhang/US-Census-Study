import React from "react";
import ReactDOM from "react-dom";
import { Treemap } from "./treemap";
import { Dropdown } from "./dropdown";
import { Tooltip } from "./tooltip";
import { PieChart } from "./piechart";
import { csv, timeParse } from "d3";

const csvUrl ="https://raw.githubusercontent.com/SZ-yang/SZ-yang/main/Infomation_Visualiztion_fnl_project/small_sample_count_edu_birthplace.csv";

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            // const parseTime = timeParse('%m/%d/%y')
            // console.log(parseTime("04/05/2022"));
            data.forEach(d => {
                d.count = +d.count
                //d.date = d["Date"];
                //d.symptomatic = +d.symptomatic;
                //d.asymptomatic = +d.asymptomatic;
                //d.infections = {"symptomtatic": d.symptomtatic, "asymptomtatic": d.asymptomtatic};
                //DataID,Gender,Race,Age,
                //Father's Birthplace,Occupation,Can Read,Can Write,Attended School,continent,industry
            
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function CovidShanghai() {
    const WIDTH = 1000;
    const HEIGHT = 950;
    const margin = {left: 50, right: 50, top: 50, bottom: 50, gap: 40};
    const width = WIDTH - margin.left - margin.right;
    const height =  HEIGHT -margin.top - margin.bottom;
    const [firstAttr, setFirstAttr] = React.useState("date");
    const [secondAttr, setSecondAttr] = React.useState("null");
    const [thirdAttr, setThirdAttr] = React.useState("null");
    const [tooltipX, setTooltipX] = React.useState(null);
    const [tooltipY, setTooltipY] = React.useState(null);
    const [selectedNode, setSelectedNode] = React.useState(null);

    const rawData = useData(csvUrl);
    // rawData.forEach(d => d.EducationLevel = getEducation(d));
    if(!rawData){
        return <p>
            "Loading..."
        </p>
    }
    // console.log(rawData);
    const attributes = [ firstAttr, secondAttr, thirdAttr ].filter( d => d !== "null");
    const options = [{value: "null", label: "None"},{value: "continent", label: "continent"}, 
        {value: "industry", label: "industry"}, {value: "Gender", label: "Gender"}];
    //{value: "zone", label: "Region"}, {value: "district", label: "District"}, {value: "date", label: "Date"}];
    const temdata = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 },{ label: 'Cookie', value: 30 }, { label: 'Coffee', value: 20 }];
    // console.log(temdata)
    console.log(rawData)
    return <div>
        <h1 style={{fontFamily:"verdana"}}>1910 New York Immigrants Occupation Study</h1>
        <Dropdown options={options} id={"selector1"} selectedValue={firstAttr} onSelectedValueChange={setFirstAttr}/>
        <Dropdown options={options} id={"selector2"} selectedValue={secondAttr} onSelectedValueChange={setSecondAttr}/>
        <Dropdown options={options} id={"selector3"} selectedValue={thirdAttr} onSelectedValueChange={setThirdAttr}/>
        <svg width={WIDTH} height={HEIGHT}>
            <Treemap width={width} height={height} data={rawData} attributes={attributes} selectedNode={selectedNode}
                setSelectedNode={setSelectedNode} setTooltipX={setTooltipX} setTooltipY={setTooltipY}/>
        </svg>
        <Tooltip d={selectedNode} left={tooltipX} top={tooltipY}/>
        <PieChart rawdata = {rawData} selectedNode={selectedNode} width={WIDTH/2} height={HEIGHT/2} innerRadius={120}
          outerRadius={200}></PieChart>

    </div>
}

ReactDOM.render( <CovidShanghai/>, document.getElementById('root'));