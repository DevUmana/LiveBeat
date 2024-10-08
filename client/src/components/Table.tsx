const Table = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Event 1</td>
            <td>01/01/2025</td>
            <td>Location 1</td>
            <td>12:00 PM</td>
          </tr>
          <tr>
            <td>Event 2</td>
            <td>02/02/2025</td>
            <td>Location 2</td>
            <td>1:00 PM</td>
          </tr>
          <tr>
            <td>Event 3</td>
            <td>03/03/2025</td>
            <td>Location 3</td>
            <td>2:00 PM</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
