'use client';
import React from 'react';

interface ChartHeaderProps {
    onRangeChange: (range: string) => void;
    onYearChange: (year: string) => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ onRangeChange, onYearChange }) => {
    const ranges = ['jan - march', 'april - june', 'july - sept', 'oct - dec'];
    const years = ['2022', '2023', '2024'];

    return (
        <div className="flex justify-between items-center px-4 rounded-xl mb-6">
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
                </div>
            </div>
        </div>
    );
};

export default ChartHeader;