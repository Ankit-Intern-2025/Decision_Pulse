import line from '../decisivePulseAI/resources/chartTypes/lines.png'
import smoothLine from '../decisivePulseAI/resources/chartTypes/smooth-line.png'

import area from '../decisivePulseAI/resources/chartTypes/area.png'

import column from '../decisivePulseAI/resources/chartTypes/column-grouped.png'
import columnStacked from '../decisivePulseAI/resources/chartTypes/column-stacked.png'
import columnStacked100 from '../decisivePulseAI/resources/chartTypes/column-stacked100.png'
import rangeColumn from '../decisivePulseAI/resources/chartTypes/column-range.png'

import bar from '../decisivePulseAI/resources/chartTypes/bar.png'
import barStacked from '../decisivePulseAI/resources/chartTypes/bar-stacked.png'
import barStacked100 from '../decisivePulseAI/resources/chartTypes/bar-stacked100.png'


import timeline from '../decisivePulseAI/resources/chartTypes/timeline.png'
import funnel from '../decisivePulseAI/resources/chartTypes/funnel.png'
import slope from '../decisivePulseAI/resources/chartTypes/slope-chart.png'
import pie from '../decisivePulseAI/resources/chartTypes/pie.png'
import donut from '../decisivePulseAI/resources/chartTypes/donut.png'
import polarArea from '../decisivePulseAI/resources/chartTypes/polar-area.png'
import radialbar from '../decisivePulseAI/resources/chartTypes/radialbar.png'
import radar from '../decisivePulseAI/resources/chartTypes/radar.png'
import heatmap from '../decisivePulseAI/resources/chartTypes/heatmap.png'
import treemap from '../decisivePulseAI/resources/chartTypes/treemap.png'
import scatter from '../decisivePulseAI/resources/chartTypes/scatter.png'
import bubble from '../decisivePulseAI/resources/chartTypes/bubble.png'

import lineBar from '../decisivePulseAI/resources/chartTypes/line-bar.png'


import { FaArrowLeft, FaIdCard } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BiHelpCircle } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";

export const chartTypesArray = [
    {type:"chart",title:"Line", img:line, xKey:"", yKeys:[], kind:["line"]},
    {type:"chart",title:"Smooth Line", img:smoothLine, xKey:"", yKeys:[], kind:["smooth-line"]},
    {type:"chart",title:"Area", img:area, xKey:"", yKeys:[], kind:["area"]},

    {type:"chart",title:"Column", img:column, xKey:"", yKeys:[], kind:["column"]},
    {type:"chart",title:"Stacked Column", img:columnStacked, xKey:"", yKeys:[], kind:["column-stacked"]},
    {type:"chart",title:"Stacked Column 100%", img:columnStacked100, xKey:"", yKeys:[], kind:["column-stacked-100"]},
    {type:"chart",title:"Column Range", img:rangeColumn, xKey:"", yKeys:[], kind:["column-range"]},

    {type:"chart",title:"Bar", img:bar, xKey:"", yKeys:[], kind:["bar"]},
    {type:"chart",title:"Stacked Bar", img:barStacked, xKey:"", yKeys:[], kind:["stacked-bar"]},
    {type:"chart",title:"Stacked Bar 100%", img:barStacked100, xKey:"", yKeys:[], kind:["stacked-bar-100"]},


    {type:"chart",title:"Timeline", img:timeline, xKey:"", yKeys:[], kind:["timeline"]},

    {type:"chart",title:"Funnel", img:funnel, xKey:"", yKeys:[], kind:["funnel"]},

    {type:"chart",title:"Slope", img:slope, xKey:"", yKeys:[], kind:["slope"]},

    {type:"chart",title:"Pie", img:pie, xKey:"", yKeys:[], kind:["pie"]},

    {type:"chart",title:"Donut", img:donut, xKey:"", yKeys:[], kind:["donut"]},

    {type:"chart",title:"Polar Area", img:polarArea, xKey:"", yKeys:[], kind:["polar-area"]},

    {type:"chart",title:"Radialbar", img:radialbar, xKey:"", yKeys:[], kind:["radialBar"]},

    {type:"chart",title:"Radar", img:radar, xKey:"", yKeys:[], kind:["radar"]},

    {type:"chart",title:"Heatmap", img:heatmap, xKey:"", yKeys:[], kind:["heatmap"]},

    {type:"chart",title:"Treemap", img:treemap, xKey:"", yKeys:[], kind:["treemap"]},

    {type:"chart",title:"Scatter", img:scatter, xKey:"", yKeys:[], kind:["scatter"]},

    {type:"chart",title:"Bubble", img:bubble, xKey:"", yKeys:[], kind:["bubble"]},


    {type:"chart",title:"Line & Bar", img:lineBar, xKey:"", "yKeys":[{"type":"line"}, {"type":"bar"}], kind:["lineBar"]},
    {type:"card",title:"Card", icon:FaIdCard, xKey:"", card:{backgroundColor:"#e7e7e7"}},

    


]
export const buttonTypesArray = [
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Left Arrow", icon:FaArrowLeft, iconName: "FaArrowLeft", buttonTitle: "Left Arrow"},
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Right Arrow", icon:FaArrowRight, iconName: "FaArrowRight", buttonTitle: "Right Arrow"},
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Bookmark", icon:CiBookmark, iconName: "CiBookmark", buttonTitle: "Bookmark"},
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Back", icon:FaRegArrowAltCircleLeft, iconName: "FaRegArrowAltCircleLeft", buttonTitle: "Back"},
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Information", icon:IoMdInformationCircleOutline, iconName: "IoMdInformationCircleOutline", buttonTitle: "Information"},
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Help", icon:BiHelpCircle, iconName: "BiHelpCircle", buttonTitle: "Help"},
    {text:"", options:{action:{enabled:false, type:"back"}}, type:"button", title:"Q&A", icon:FaRegCommentAlt, iconName: "FaRegCommentAlt", buttonTitle: "Q&A"},
]

export const shapesData = [
    {
        key: "polygon",
        type:"shape",
        title: "Polygon",
    
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        
    },
    {
        key: "triangle",
        type:"shape",
        title: "Triangle",
        
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
    {
        key: "parallelogram",
        type:"shape",
        title: "Parallelogram",
    
        clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    },
    {
        key: "pentagon",
        type:"shape",
        title: "Pentagon",
        
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    },
    {
        key: "trapezoid",
        type:"shape",
        title: "Trapezoid",
        
        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    },
    {
        key: "hexagon",
        type:"shape",
        title: "Hexagon",
        
        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    },
    {
        key: "heptagon",
        type:"shape",
        title: "Heptagon",
        
        clipPath: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
    },
    {
        key: "octagon",
        type:"shape",
        title: "Octagon",
        
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    },
    {
        key: "rabbet",
        type:"shape",
        title: "Rabbet",
        
        clipPath: "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
    },
    {
        key: "left arrow",
        type:"shape",
        title: "Left Arrow",
        
        clipPath: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
    },
    {
        key: "right arrow",
        type:"shape",
        title: "Right Arrow",
        
        clipPath: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
    },
    {
        key: "star",
        type:"shape",
        title: "Star",
        
        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    },
    {
        key: "cross",
        type:"shape",
        title: "Cross",
        
        clipPath: "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)",
    },
    {
        key: "close",
        type:"shape",
        title: "Close",
        
        clipPath: "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
    },
    {
        key: "frame",
        type:"shape",
        title: "Frame",
        
        clipPath: "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
    },
    {
        key: "left chevron",
        type:"shape",
        title: "Left Chevron",
        
        clipPath: "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
    },
    {
        key: "right chevron",
        type:"shape",
        title: "Right Chevron",
        
        clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
    },
];