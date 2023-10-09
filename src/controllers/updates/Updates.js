import React from "react";
import "./Updates.css";

const Updates = () => {
  return (
    <div>
      <div className="updates-main">
        <h1>University Events</h1>

        <h2>Create New Event</h2>
        <form id="eventForm">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <br></br>

          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required />
          <br></br>

          <label for="time">Time:</label>
          <input type="text" id="time" name="time" required />
          <br></br>

          <label for="location">Location:</label>
          <input type="text" id="location" name="location" required />
          <br></br>

          <label for="description">Description:</label>
          <textarea id="description" name="description" required></textarea>
          <br></br>

          <button type="submit" onclick="">
            Create Event
          </button>
        </form>

        <h2>Events</h2>
        <ul id="eventList"></ul>
      </div>
    </div>
  );
};

export default Updates;
