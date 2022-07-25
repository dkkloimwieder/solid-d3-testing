import { createEffect, Index, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
//import { select } from 'd3';
import { scaleLinear } from 'd3';
//import '/src/styles.css';

interface Circle {
    cx: number;
    cy: number;
    r: number;
    fill: number;
}
const Animated = () => {
    let el: any;

    onMount(() => {
        el.animate(
            [
                { transform: 'translateX(500px)' },
                { transform: 'translateX(100px)' },
            ],
            {
                duration: 500,
                iterations: Infinity,
                easing: 'linear',
                fill: 'forwards',
            }
        );
    });

    return <div ref={el}>hello</div>;
};

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
                cx: Math.random(),
                cy: Math.random(),
                r: Math.random(),
                fill: Math.floor(colours.length * Math.random()),
            });
        }
        return data;
    };
    const [circs, setCircs] = createStore({ circles: getData(10) });
    let circleEle: SVGCircleElement[] = [];
    let maxRadius = 50;
    let xScale = scaleLinear().domain([0, 1]).range([0, width]);
    let yScale = scaleLinear().domain([0, 1]).range([0, height]);
    let rScale = scaleLinear().domain([0, 1]).range([0, maxRadius]);
    // createEffect(() => {

    //     for (let i = 0; i < circleEle.length; i++) {
    //         // const c = document.createElementNS(
    //         //     'http://www.w3.org/2000/svg',
    //         //     'circle'
    //         // );
    //         circleEle[i].setAttribute(
    //             'cx',
    //             xScale(circs.circles[i].cx).toString()
    //         );
    //         circleEle[i].setAttribute(
    //             'cy',
    //             yScale(circs.circles[i].cy).toString()
    //         );
    //         circleEle[i].setAttribute(
    //             'r',
    //             rScale(circs.circles[i].r).toString()
    //         );
    //         circleEle[i].style.fill = colours[circs.circles[i].fill];
    //         //svgEl.append(c);
    //     }
    //     // select(svgEl)
    //     //     .selectAll('circle')
    //     //     .data(circs.circles)
    //     //     //   .transition()
    //     //     //   .duration(1000)
    //     //     .attr('cx', (d) => xScale(d.x))
    //     //     .attr('cy', (d) => yScale(d.y))
    //     //     .attr('r', (d) => rScale(d.r))
    //     //     .style('fill', (d) => colours[d.colour]);
    // });
    interface Spring {
        position: number;
        velocity: number;
        stiffness: number;
        damping: number;
    }
    const sprong = (spr: Spring, len: number) => {
        const { position, velocity, stiffness, damping } = spr;
        const d = position - len;
        const sForce = -stiffness * d;
        const dForce = sForce + -damping * velocity;
        const acc = dForce; // * mass=1
        const refresh = 1 / 60;

        const newVelocity = velocity + acc * refresh;
        const newPosition = position + newVelocity * refresh;

        return { position: newPosition, velocity: newVelocity };
    };

    const animatePos = (spr: Spring, len: number, time: number) => {
        let { position, velocity, stiffness } = spr;
        while (time < 1 - 1 / 60) {
            ({ position, velocity } = sprong(spr, len));
            console.log(position);
        }
        position = len;
    };
    let running = 0;
    let total = 1;
    while (running < total) {
        animatePos(
            { position: 100, velocity: 100, stiffness: 15, damping: 50 },
            100,
            running
        );
        running += 1 / 60;
    }

    const ani = (ele: Element) => {
        const x = Math.floor(Math.random() * 500 - 250);
        const y = Math.floor(Math.random() * 500 - 250);
        ele.animate(
            [
                { transform: `translate(${x}px, ${y}px)` },
                //{ transform: `translateY(${y}px)` },
            ],
            {
                duration: 500,
                //iterations: Infinity,
                easing: 'ease-in-out',
                fill: 'both',
            }
        );
    };

    return (
        <div>
            <Animated></Animated>
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
                        const ci = (
                            <circle
                                //class="circ"
                                onClick={(e) => {
                                    ani(e.currentTarget);
                                    //select(circleEl[i]).style('fill', 'red');
                                    //setCircs('circles', i, 'fill', 0);
                                }}
                                cx={xScale(circs.circles[i].cx)}
                                cy={yScale(circs.circles[i].cy)}
                                r={rScale(circs.circles[i].r)}
                                style={{
                                    fill: colours[circs.circles[i].fill],
                                }}
                                ref={circleEle[i]}
                            />
                        ) as Element;

                        return ci;

                        //     return (
                        //         <circle
                        //             //class="circ"
                        //             onClick={() => {
                        //                 //select(circleEl[i]).style('fill', 'red');
                        //                 setCircs('circles', i, 'fill', 0);
                        //             }}
                        //             cx={xScale(circs.circles[i].cx)}
                        //             cy={yScale(circs.circles[i].cy)}
                        //             r={rScale(circs.circles[i].r)}
                        //             style={{
                        //                 fill: colours[circs.circles[i].fill],
                        //             }}
                        //             ref={circleEle[i]}
                        //         ></circle>
                        //     );
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
