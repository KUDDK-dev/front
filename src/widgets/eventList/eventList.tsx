// components/CalendarGrid.tsx
'use client';

import { HakatonEvent } from '#/types/event.enum';
import React from 'react';

interface CalendarGridProps {
    events: HakatonEvent[];
}

// Функция генерации цвета из хэша
const getColorFromString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);
    return `hsl(${h}, 70%, 80%)`;
};

// Функция проверки - один ли день
const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ events }) => {
    // Фильтруем только реальные события
    const realEvents = events.filter(e => e.title !== 'no event');

    // Получаем все уникальные теги
    const allTags = Array.from(new Set(realEvents.flatMap(e => e.tags))).filter(Boolean);

    // Создаем массив из 30 дней
    const daysInView = 30;
    const today = new Date();
    const daysArray = Array.from({ length: daysInView }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date;
    });

    // Группируем события по дням для быстрого доступа
    const eventsByDay = new Map<string, HakatonEvent[]>();

    realEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;

        if (!eventsByDay.has(dateKey)) {
            eventsByDay.set(dateKey, []);
        }
        eventsByDay.get(dateKey)!.push(event);
    });

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">
            {/* Заголовок календаря */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Календарь событий</h2>
            </div>

            {/* Панель тегов */}
            <div className="flex-shrink-0 px-4 py-2 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-1">
                    {allTags.map((tag, i) => (
                        <span
                            key={tag.title}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                                backgroundColor: getColorFromString(tag.title),
                                color: 'hsl(0, 0%, 20%)'
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full mr-1"
                                style={{ backgroundColor: 'hsl(0, 0%, 20%)' }}
                            />
                            {tag.title}
                        </span>
                    ))}
                </div>
            </div>

            {/* Основная сетка дней - занимает всё оставшееся пространство */}
            <div className="flex-1 overflow-auto p-4">
                <div className="grid grid-cols-7 gap-2 min-h-full">
                    {/* Дни недели */}
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                        <div
                            key={i}
                            className="text-center text-sm font-medium text-gray-500 pb-2"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Ячейки дней */}
                    {daysArray.map((day, index) => {
                        const dateKey = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
                        const dayEvents = eventsByDay.get(dateKey) || [];
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div
                                key={index}
                                className={`
                  relative min-h-[80px] border rounded-lg p-2
                  ${isToday ? 'border-blue-500 border-2 bg-blue-50' : 'border-gray-200'}
                  ${dayEvents.length > 0 ? 'bg-gray-50' : 'bg-white'}
                  hover:shadow-md transition-shadow
                `}
                            >
                                {/* Число месяца */}
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`
                    text-sm font-semibold
                    ${isToday ? 'text-blue-600' : 'text-gray-700'}
                  `}>
                                        {day.getDate()}
                                    </span>
                                    {dayEvents.length > 0 && (
                                        <span className="text-xs text-gray-500">
                                            {dayEvents.length}
                                        </span>
                                    )}
                                </div>

                                {/* Теги дня */}
                                <div className="space-y-1 mt-2">
                                    {dayEvents.slice(0, 3).map((event, eventIdx) => (
                                        <div key={eventIdx} className="space-y-1">
                                            {/* Название события */}
                                            <div className="text-xs font-medium truncate text-gray-800">
                                                {event.title}
                                            </div>

                                            {/* Теги события */}
                                            {event.tags.slice(0, 2).map((tag, tagIdx) => (
                                                <div
                                                    key={tagIdx}
                                                    className="text-[10px] px-1 py-0.5 rounded truncate"
                                                    style={{
                                                        backgroundColor: getColorFromString(tag.title),
                                                        color: 'hsl(0, 0%, 20%)'
                                                    }}
                                                >
                                                    {tag.title}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Индикатор если больше 3 событий */}
                                {dayEvents.length > 3 && (
                                    <div className="absolute bottom-1 right-1">
                                        <span className="text-xs text-gray-400">
                                            +{dayEvents.length - 3}
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalendarGrid;