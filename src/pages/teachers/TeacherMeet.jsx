import { useState } from "react";
import ZegoMeet from "../../components/teachers/ZegoMeet";

function TeacherMeet() {
  const [roomID, setRoomID] = useState("");
  const [userName, setUserName] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);

  // Generate random Room ID
  const generateRoomID = () => {
    const randomID = `room-${Math.random().toString(36).substr(2, 9)}`;
    setRoomID(randomID);
    alert(`Room created! Share this Room ID: ${randomID}`);
  };

  // Join Room
  const joinRoom = () => {
    if (roomID.trim() && userName.trim()) {
      setIsInRoom(true);
    } else {
      alert("Please enter both Room ID and User Name.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!isInRoom ? (
        <div>
          <h1>Welcome to the Classroom App</h1>
          <button onClick={generateRoomID} style={buttonStyles}>
            Create Room
          </button>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value.trim())} // Trim input
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value.trim())} // Trim input
            style={inputStyles}
          />
          <br />
          <button onClick={joinRoom} style={buttonStyles}>
            Join Room
          </button>
        </div>
      ) : (
        <ZegoMeet
          roomID={roomID}
          userName={userName}
          onLeave={() => setIsInRoom(false)}
        />
      )}
    </div>
  );
}

const buttonStyles = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  margin: "10px",
};

const inputStyles = {
  padding: "10px",
  margin: "10px",
  width: "300px",
};

export default TeacherMeet;