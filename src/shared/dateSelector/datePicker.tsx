'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import { format, differenceInDays, startOfDay, endOfDay, isSameDay } from 'date-fns';

interface Props {
  onDateRangeChange?: (startDate: Date | null, endDate: Date | null, daysCount: number) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export default function CustomDatePicker({ 
  onDateRangeChange,
  initialStartDate = null,
  initialEndDate = null 
}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  useEffect(() => {
    if (onDateRangeChange) {
      const days = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
      onDateRangeChange(startDate, endDate, days);
    }
  }, [startDate, endDate, onDateRangeChange]);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    
    if (start && !end) {
      setStartDate(startOfDay(start));
      setEndDate(null);
    } else if (start && end) {
      setStartDate(startOfDay(start));
      setEndDate(endOfDay(end));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const formatDateRange = () => {
    if (!startDate) return 'Интервал не выбран';
    if (!endDate) return `${format(startDate, 'dd MMMM yyyy', { locale: ru })}`;
    
    return `${format(startDate, 'dd MMMM yyyy', { locale: ru })} — ${format(endDate, 'dd MMMM yyyy', { locale: ru })}`;
  };

  const daysCount = startDate && endDate 
    ? differenceInDays(endDate, startDate) + 1 
    : 0;

  const resetSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl max-w-110">
      <div className="p-6 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6">
              <Image
                src="/calendar_star.svg"
                alt="Календарь"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Выбор интервала
            </h2>
          </div>
          
          <button
            onClick={resetSelection}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            Сбросить
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-medium">Выбранный интервал:</p>
              <p className="text-lg text-blue-900 font-semibold">
                {formatDateRange()}
              </p>
              {daysCount > 0 && (
                <p className="text-sm text-blue-700 mt-1">
                  {daysCount} {daysCount === 1 ? 'день' : daysCount < 5 ? 'дня' : 'дней'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-6">
        <div className="h-full flex justify-center">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            locale={ru}
            inline
            dateFormat="dd.MM.yyyy"
            calendarClassName="!border-0 !shadow-none h-full"
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 rounded-lg hover:bg-gray-100"
                >
                  ←
                </button>
                
                <span className="text-xl font-semibold text-gray-800">
                  {date.toLocaleDateString('ru-RU', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 rounded-lg hover:bg-gray-100"
                >
                  →
                </button>
              </div>
            )}
            dayClassName={(date) => {
              const baseClass = "h-12 w-12 flex items-center justify-center text-lg rounded-lg transition-all";
              
              if (startDate && endDate && date >= startDate && date <= endDate) {
                if (isSameDay(date, startDate)) {
                  return `${baseClass} bg-blue-600 text-white font-bold rounded-r-none`;
                } else if (isSameDay(date, endDate)) {
                  return `${baseClass} bg-blue-600 text-white font-bold rounded-l-none`;
                } else {
                  return `${baseClass} bg-blue-100 text-blue-900 font-medium rounded-none`;
                }
              }
              
              return `${baseClass} hover:bg-gray-100 text-gray-700`;
            }}
            weekDayClassName={() => 
              "text-gray-600 font-medium text-base py-4"
            }
          />
        </div>
      </div>
    </div>
  );
}