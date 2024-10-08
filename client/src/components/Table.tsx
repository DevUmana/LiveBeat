import React from "react";

interface Event {
  title: string;
  date: {
    start_date: string;
    when: string;
  };
  address: string[];
  link: string;
  thumbnail: string;
}

interface TableProps {
  events: Event[];
}

const Table: React.FC<TableProps> = ({ events }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Address</th>
            <th>Link</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>
                {event.date.start_date} - {event.date.when}
              </td>
              <td>{event.address.join(", ")}</td>
              <td>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  More Details
                </a>
              </td>
              <td>
                <img
                  src={event.thumbnail}
                  alt={`${event.title} thumbnail`}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
