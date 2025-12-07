"use client"

import CustomDatePicker from "#/shared/dateSelector/datePicker";
import { HakatonEvent } from "#/types/event.enum";
import Calendar from "#/widgets/eventList/eventList";
import { useState } from "react";

export default function Home() {
    const [selectedInterval, setSelectedInterval] = useState<HakatonEvent[]>();

    const isSimilarDate = (date1: Date, date2: Date) => {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

        return d1.getTime() === d2.getTime();
    }

    const onSelect = async (start_date: Date | null, end_date: Date | null, daysCount: number) => {
        if (!start_date || !end_date) return;

        // const events = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI!}/api/events?start_date=${Math.floor(start_date.getTime() / 1000)}&end_date=${Math.floor(end_date.getTime() / 1000) }`)
        //     .then(el => el.json())
        //     .catch(err => []) as HakatonEvent[]

        const days = []
        const events = [
            {
                date: "2025-12-07T10:12:51+00:00",
                description: "Lorem ipsum dolor sit",
                members: [],
                tags: [{ title: "DevOps" }, { title: "Frontend" }, { title: "Backend" }],
                title: "Event1"
            },
            {
                date: "2025-12-12T10:12:51+00:00",
                description: "",
                members: [],
                tags: [{ title: "Вышмат" }, { title: "Биология" }, { title: "Нейро-инженерия" }],
                title: "Event2"
            }
    
        ] as HakatonEvent[]

        for (let i = 0; i < daysCount; i++) {
            const day = new Date(start_date.getTime());
            day.setDate(day.getDate() + i);

            const event = events.filter(el => isSimilarDate(new Date(el.date), day))[0]

            if (event)
                days.push(event)
            else
                days.push({
                    date: day.toISOString(),
                    description: "no event",
                    members: [],
                    tags: [],
                    title: "no event"
                })
        }

        setSelectedInterval(days);
    };

    return (
        <div className="h-1/1 w-1/1 flex justify-center">
            <CustomDatePicker onDateRangeChange={onSelect} />
            <div className="w-1/1 h-1/1">
                {selectedInterval 
                    ? <Calendar events={selectedInterval} />
                    : <h3>No events</h3>
                }
            </div>
        </div>
    );
}
