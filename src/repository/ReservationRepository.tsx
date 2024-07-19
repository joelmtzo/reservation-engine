import axios from "axios";

async function getReservations() {
  const url = "http://localhost:5158/api/Reservation";

  return await axios.get(url);
}

export default { getReservations };