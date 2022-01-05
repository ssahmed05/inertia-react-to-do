import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Inertia } from '@inertiajs/inertia';

const eventClickHandler = (e) => {
    Inertia.visit(route('task.list', e.event.groupId), {method:"get"});
}


const Calender = ({events}) => {

    return (
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar = {{
            start: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
            end: 'today prev,next'
          }}
          eventColor="red"
          nowIndicator
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={(e) => eventClickHandler(e)}
          selectable
        //   customButtons={{
        //     new: {
        //       text: 'new',
        //       click: () => console.log('new event'),
        //     },
        //   }}
          events={events}
      />
    )
}

export default Calender
