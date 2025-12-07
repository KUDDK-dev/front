"use client"

import CustomDatePicker from "#/shared/dateSelector/datePicker";
import "./eventsSection.scss";


export default function EventsSection() {

    return (
        <section className="events-container">
            <CustomDatePicker />
        </section>
    );
}
