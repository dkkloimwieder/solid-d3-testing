import { createEffect, Index } from 'solid-js';
import { createStore } from 'solid-js/store';
import { select } from 'd3';
import { scaleLinear } from 'd3';
//import { setAttribute } from 'solid-js/web';

interface Circle {
    x: number;
    y: number;
    r: number;
    colour: number;
}
const Circles = () => {
    let width: number = 1000;
    let height: number = 1000;
    let colours = ['#3f3f41', '#00040f', '#efe03b', '#bec3c9', '#4a5485'];
    let svgEl: any;
    const getData: (num: number) => Circle[] = (num: number) => {
        let numItems: number = num; // + Math.floor(20 * Math.random());
        let data: Circle[] = [];
        for (let i = 0; i < numItems; i++) {
            data.push({
                x: Math.random(),
                y: Math.random(),
                r: Math.random(),
                colour: Math.floor(colours.length * Math.random()),
            });
        }
        return data;
    };
    const [circs, setCircs] = createStore({ circles: getData(100) });
    //const [circles, setCircles] = createSignal(getData());
    let computedSVGNode: any;
    let circleEl: SVGCircleElement[] = [];
    createEffect(() => {
        let maxRadius = 50;
        let xScale = scaleLinear().domain([0, 1]).range([0, width]);
        let yScale = scaleLinear().domain([0, 1]).range([0, height]);
        let rScale = scaleLinear().domain([0, 1]).range([0, maxRadius]);
        select(svgEl)
            .selectAll('circle')
            .data(circs.circles)
            //.transition()
            //.duration(100)
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y))
            .attr('r', (d) => rScale(d.r))
            .style('fill', (d) => colours[d.colour]);
    });
    //createEffect(() => {
    //    select(svgEl)
    //        .selectAll('circle')
    //        .data(circs.circles)
    //        .join()
    //        .transition()
    //        .duration(1000);
    //});
    //     let maxRadius = 50;
    //     let xScale = scaleLinear().domain([0, 1]).range([0, width]);
    //     let yScale = scaleLinear().domain([0, 1]).range([0, height]);
    //     let rScale = scaleLinear().domain([0, 1]).range([0, maxRadius]);

    // createMemo(() =>
    //     circs.circles.map((n, i) => {
    //         select(circleEl[i])
    //             .datum(n)
    //             //.transition()
    //             //.duration(100)
    //             .attr('cx', (d) => xScale(d.x))
    //             .attr('cy', (d) => yScale(d.y))
    //             .attr('r', (d) => rScale(d.r))
    //             .style('fill', (d) => colours[d.colour]);
    //     })
    // );
    //  computedSVGNode = select(svgEl)
    //      .selectAll('circle')
    //      .datum(circs.circles)
    //      .transition()
    //      .duration(1000);
    //});
    //         .attr('cx', (d) => xScale(d.x))
    //         .attr('cy', (d) => yScale(d.y))
    //         .attr('r', (d) => rScale(d.r))
    //         .style('fill', (d) => colours[d.colour]);

    //     // console.log(computedSVGNode, svgEl);
    //     // circs.circles.map((n, i) => {
    //     //     select(computedSVGNode[i])
    //     //         .datum(circs.circles[i])
    //     //         .attr('cx', (d) => xScale(d.x))
    //     //         .attr('cy', (d) => yScale(d.y))
    //     //         .attr('r', (d) => rScale(d.r))
    //     //         .style('fill', (d) => colours[d.colour]);
    //     // });
    // });
    return (
        <div>
            <svg width={width} height={height} ref={svgEl}>
                <Index each={circs.circles}>
                    {(d, i) => {
                        /*let maxRadius = 10;
                        let xScale = scaleLinear()
                            .domain([0, 1])
                            .range([0, width]);
                        let yScale = scaleLinear()
                            .domain([0, 1])
                            .range([0, height]);
                        let rScale = scaleLinear()
                            .domain([0, 1])
                            .range([0, maxRadius]);*/
                        return (
                            <circle
                                onClick={() => {
                                    //select(circleEl[i]).style('fill', 'red');
                                    setCircs('circles', i, 'colour', 0);
                                }}
                                cx={1}
                                cy={1}
                                r={0}
                                style={{
                                    fill: colours[d().colour],
                                }}
                                ref={circleEl[i]}
                                // cx={xScale(d().x)}
                                // cy={yScale(d().y)}
                                // r={rScale(d().r)}
                                // style={{
                                //     fill: colours[d().colour],
                                // }}
                                // ref={circleEl[i]}
                            />
                        );
                    }}
                </Index>
            </svg>
            <button
                onClick={() =>
                    setCircs('circles', (c) => [...c, getData(1)[0]])
                }
            >
                UPDATE!
            </button>
            <button
                onClick={() =>
                    setCircs('circles', (c) => [...c, ...getData(1000)])
                }
            >
                UPDATE!
            </button>
        </div>
    );
};

export default Circles;
