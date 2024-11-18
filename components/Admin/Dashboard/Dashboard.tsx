"use client"

import LineChart from "@/components/Shared/LineChart/LineChart"
import Menus from "./Menus/Menus"
import ChartHeader from "@/components/Shared/LineChart/ChartHeader";
import { IoIosNotifications } from "react-icons/io";
import CircleChart from "@/components/Shared/CircleChart/CircleChart";
import { useState } from "react";

export default function Dashboard() {

    // demo data of the day's statics
    const staticsDataDemo = [
        {
            id: 1,
            title: "total leads today",
            amount: 1259
        },
        {
            id: 2,
            title: "open leads",
            amount: 23
        },
        {
            id: 3,
            title: "awarded leads",
            amount: 123
        },
        {
            id: 4,
            title: "total users",
            amount: 123
        }
    ]

    // these chart data will be connect with backend and dynamic. here it is demo for example
    const clientData = [25, 5, 90, 20, 10, 80, 35, 60, 95, 10, 30, 85];
    const professionalData = [20, 40, 35, 45, 55, 50, 60, 10, 76, 20, 70, 30];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [filteredClientData, setFilteredClientData] = useState<number[]>(clientData);
    const [filteredProfessionalData, setFilteredProfessionalData] = useState<number[]>(professionalData);
    const [filteredLabels, setFilteredLabels] = useState<string[]>(labels);

    const handleRangeChange = (range: string) => {
        const rangeMapping: Record<string, [number, number]> = {
            'jan - march': [0, 2],
            'april - june': [3, 5],
            'july - sept': [6, 8],
            'oct - dec': [9, 11],
        };

        const [start, end] = rangeMapping[range];
        setFilteredClientData(clientData.slice(start, end + 1));
        setFilteredProfessionalData(professionalData.slice(start, end + 1));
        setFilteredLabels(labels.slice(start, end + 1));
    };

    const handleYearChange = (year: string) => {
        // Add logic for year filtering if applicable
        console.log(`Year selected: ${year}`);
    };

    const handleWeekChange = (week: string) => {
        const weekMapping: Record<string, [number, number]> = {
            'week 1': [0, 0],
            'week 2': [1, 1],
            'week 3': [2, 2],
            'week 4': [3, 3],
            'week 5': [4, 4],
            'week 6': [5, 5],
            'week 7': [6, 6],
            'week 8': [7, 7],
            'week 9': [8, 8],
            'week 10': [9, 9],
            'week 11': [10, 10],
            'week 12': [11, 11],
        };

        const [start, end] = weekMapping[week];
        setFilteredClientData(clientData.slice(start, end + 1));
        setFilteredProfessionalData(professionalData.slice(start, end + 1));
        setFilteredLabels(labels.slice(start, end + 1));
    };


    // the circular data example
    const leadsStatus = {
        "Jan-Mar": { openLead: 50, awarded: 30, rejected: 20 },
        "Apr-Jun": { openLead: 80, awarded: 40, rejected: 30 },
        "Jul-Sep": { openLead: 70, awarded: 60, rejected: 50 },
        "Oct-Dec": { openLead: 90, awarded: 80, rejected: 40 },
        "2023": { openLead: 300, awarded: 200, rejected: 150 },
        "2022": { openLead: 250, awarded: 180, rejected: 120 },
        "Week 1": { openLead: 20, awarded: 15, rejected: 10 },
        "Week 2": { openLead: 25, awarded: 18, rejected: 12 },
    };


    const [rangeType, setRangeType] = useState<"Monthly" | "Yearly" | "Weekly">("Monthly");
    const [range, setRange] = useState<string>("Jan-Mar");

    const ranges = {
        Monthly: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
        Yearly: ["2023", "2022"],
        Weekly: ["Week 1", "Week 2"],
    };

    const handleRangeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as "Monthly" | "Yearly" | "Weekly";
        setRangeType(newType);
        setRange(ranges[newType][0]); // Set the first range as default
    };

    const handleRangeChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRange(e.target.value);
    };

    const chartData = leadsStatus[range];


    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-5 overflow-y-scroll relative hiddenScroll">

                {/* statics details */}
                <div className="flex flex-wrap gap-5 pb-5">
                    {
                        staticsDataDemo?.map((data, i) => (
                            <div key={i} className="w-full md:w-[180px] lg:w-[18%] h-[130px] bg-[#07242B] px-4 pb-4 pt-10 rounded-md">
                                <h3 className="text-[25px] font-bold text-white">{data?.amount}</h3>
                                <p className="text-[15px] text-[#FFBE00] capitalize">{data?.title}</p>
                            </div>
                        ))
                    }
                    <div className="w-full md:w-[180px] lg:w-[18%] h-[130px] relative bg-[#07242B] rounded-md overflow-hidden">
                        <div className="z-[2] absolute px-4 pt-3">
                            <h3 className="text-white text-start pb-[10px] font-bold text-[15px]">Total Upgrades</h3>
                            <h3 className="text-[25px] font-bold text-white">123</h3>
                            <p className="text-[15px] text-[#FFBE00] capitalize">Users</p>
                        </div>
                        <div className="w-[200px] absolute pt-14 lg:pt-16 ps-12 -right-1/2 lg:-right-[120px] z-[1] -top-[25%] h-[200px] bg-[#FFBE00] rounded-full">
                            <IoIosNotifications className="size-[20px] text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-between flex-col lg:flex-row">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white shadow-lg border border-black/10 w-full p-4 rounded-lg">
                            <ChartHeader
                                onRangeChange={handleRangeChange}
                                onYearChange={handleYearChange}
                                onWeekChange={handleWeekChange}
                            />
                            <LineChart
                                clientData={filteredClientData}
                                professionalData={filteredProfessionalData}
                                labels={filteredLabels}
                            />
                        </div>

                        {/* this notification will be dynamically from backend later */}
                        <div className="pt-4">
                            <div className="bg-white shadow-lg border border-black/10 w-full px-4 pt-4 pb-7 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[15px] text-black/70 font-semibold tracking-wide">Support Tickets</h3>
                                        <p className="text-[15px] text-black/70 py-3">You have 10 pending support tickets today</p>
                                    </div>

                                    <button className="text-[15px] px-5 py-2 bg-[#FE321F] rounded-md text-white font-semibold">View Support</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="w-full">
                            {/* Circle Chart */}
                            <CircleChart
                                openLeads={chartData.openLead}
                                awardedLeads={chartData.awarded}
                                rejectedLeads={chartData.rejected}
                                title={`Leads Status (${range})`}
                                handleRangeChange2={handleRangeChange2}
                                rangeType={rangeType}
                                handleRangeTypeChange={handleRangeTypeChange}
                                range={range}
                                ranges={ranges}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
