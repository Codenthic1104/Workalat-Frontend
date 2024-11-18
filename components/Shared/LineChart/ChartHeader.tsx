'use client';
import React from 'react';

interface ChartHeaderProps {
    onRangeChange: (range: string) => void;
    onYearChange: (year: string) => void;
    onWeekChange: (week: string) => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ onRangeChange, onYearChange, onWeekChange }) => {
    const ranges = ['jan - march', 'april - june', 'july - sept', 'oct - dec'];
    const years = ['2022', '2023', '2024'];
    const weeks = [
        'week 1', 'week 2', 'week 3', 'week 4',
        'week 5', 'week 6', 'week 7', 'week 8',
        'week 9', 'week 10', 'week 11', 'week 12',
    ];

    return (
        <div className="flex justify-between items-start px-4 rounded-xl mb-6">
            {/* Left Section */}
            <div className="flex items-end">
                <div className="block">
                    <h2 className="text-[15px] font-medium text-black/80 pb-[1px]">Users statistics</h2>
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent capitalize text-gray-400"
                        onChange={(e) => onRangeChange(e.target.value)}
                    >
                        {ranges.map((range) => (
                            <option className='capitalize' key={range} value={range}>
                                {range}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="block ml-4">
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent text-gray-400"
                        onChange={(e) => onYearChange(e.target.value)}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="block ml-4">
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent text-gray-400"
                        onChange={(e) => onWeekChange(e.target.value)}
                    >
                        {weeks.map((week) => (
                            <option key={week} value={week}>
                                {week}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex space-x-4">
                {/* Clients */}
                <div className="w-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-semibold">CLIENTS</span>
                    </div>
                    <p className="text-[17px] font-semibold text-gray-800 text-end">475273</p>
                </div>

                {/* Professionals */}
                <div className="w-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-semibold">PROFESSIONALS</span>
                    </div>
                    <p className="text-[17px] font-semibold text-gray-800 text-end">782396</p>

                    <button className='bg-yellow-400 px-3 py-1.5 rounded-md font-semibold mt-4 text-sm'>Download</button>
                </div>
            </div>
        </div>
    );
};

export default ChartHeader;