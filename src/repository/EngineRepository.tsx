import axios from "axios";

async function getAvailableHotels(
  checkin: string,
  checkout: string,
  desiredHotelId: string
) {
  const url = "http://localhost:5158/api/Engine";

  const params = new URLSearchParams();
  params.append("checkinDate", checkin);
  params.append("checkoutDate", checkout);
  params.append("desiredHotelId", desiredHotelId);

  return await axios.get(`${url}?${params.toString()}`);
}

async function makeReservation(
  checkin: string,
  checkout: string,
  hotelId: string,
  roomType: string
) {
  const url = "http://localhost:5158/api/Engine";

  const payload = {
    // random int from 1 to 10
    customerId: Math.floor(Math.random() * 10) + 1,
    checkinDate: checkin,
    checkoutDate: checkout,
    hotelId: hotelId,
    roomType: roomType,
  };

  return await axios.post(url, payload);
}

export default { getAvailableHotels, makeReservation };
