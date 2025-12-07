"use client"

import CustomDatePicker from "#/shared/dateSelector/datePicker";
import { useState } from "react";

export default function Home() {
    const [selectedInterval, setSelectedInterval] = useState<[Date | null, Date | null]>();

    const onSelect = (startDate: Date | null, endDate: Date | null, daysCount: number) => {
        
    };

    return (
        <div className="h-1/1">
            <CustomDatePicker onDateRangeChange={onSelect} />
            <div className="interval-range">

            </div>
        </div>
    );
}
