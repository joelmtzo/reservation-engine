import { useEffect, useState } from "react";
import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import toast, { Toaster } from "react-hot-toast";
import EngineRepository from "./repository/EngineRepository";
import HotelRepository from "./repository/HotelRepository";
import HotelResults from "./components/HotelResults";
import SearchForm from "./components/SearchForm";
import ReservationRepository from "./repository/ReservationRepository";

export function Main() {
  const checkinInitial = new Date().toISOString().split("T")[0];
  const checkoutInitial = new Date(new Date().setDate(new Date().getDate() + 5))
    .toISOString()
    .split("T")[0];

  function formatDate(date: string) {
    return date.split("T")[0];
  }

  function formatCurrency(value: string) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(value));
  }

  const [hotels, setHotels] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [hotelId, setHotelId] = useState<string>("1");
  const [checkin, setCheckin] = useState<string>(checkinInitial);
  const [checkout, setCheckout] = useState<string>(checkoutInitial);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("home");
  
  useEffect(() => {
    console.log("useEffect");

    HotelRepository.getHotels()
      .then((response) => setHotels(response.data))
      .catch((error) =>
        toast.error("Error al obtener los hoteles", {
          duration: 5000,
          position: "top-center",
        })
      );

    getReservations();
  }, []);

  function handleClick() {
    setIsLoading(true);
    setAvailableHotels([]);

    setTimeout(() => {
      EngineRepository.getAvailableHotels(checkin, checkout, hotelId)
        .then((response) => {
          if(response.status === 204) {
            toast.error("No se encontraron habitaciones disponibles", {
              duration: 5000,
              position: "top-center",
              style: {
                background: "#ff0000",
                color: "#fff",
              },
            });
            return;
          }
          setAvailableHotels(response.data);
        })
        .catch((error) => {
          toast.error("Error al obtener las habitaciones disponibles", {
            duration: 5000,
            position: "top-center",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }

  function handleChange() {
    var select = document.querySelector("select");
    var selectedOption = select?.options[select.selectedIndex];
    setHotelId(selectedOption?.value);
  }

  function getReservations() {
    ReservationRepository.getReservations()
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) =>
        toast.error("Error al obtener las reservaciones", {
          duration: 5000,
          position: "top-center",
        })
      );
  }

  function makeReservation(roomType: string) {
    setIsLoading(true);

    EngineRepository.makeReservation(checkin, checkout, hotelId, roomType)
      .then((response) => {
        toast.success("Reservación realizada con éxito", {
          duration: 5000,
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error("Error al realizar la reservación", {
          duration: 5000,
          position: "top-center",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setAvailableHotels([]);
        getReservations();
      });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Amazing Hotel
          </a>
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">
              <a className="nav-link" href="#" onClick={() => setTab("home")}>
                Home
              </a>
            </li>
            <li className="list-group-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setTab("reservations")}
              >
                Reservaciones
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
            {tab === "home" && (
              <>
                <div className="text-center py-5 mt-5">
                  <h1>Amazing Hotel</h1>
                  <p>Tus mejores vacaciones, estan con nosotros</p>
                </div>

                <SearchForm
                  hotels={hotels}
                  checkin={checkin}
                  checkout={checkout}
                  setCheckin={setCheckin}
                  setCheckout={setCheckout}
                  handleClick={handleClick}
                  handleChange={handleChange}
                  isLoading={isLoading}
                />

                <HotelResults
                  availableHotels={availableHotels}
                  makeReservation={makeReservation}
                  isLoading={isLoading}
                />

                <Toaster />
              </>
            )}

            {tab === "reservations" && reservations && (
              <div className="row">
                <div className="col-12 mx-auto py-5 text-center">
                  <h3 className="py-3">Reservaciones</h3>
                  <table className="table table-bordered table-striped small">
                    <tbody>
                      <tr>
                        <th>Cliente</th>
                        <th>Hotel</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                        <th>Tipo</th>
                        <th># Habitacion</th>
                        <th>Total</th>
                        <th>Estatus</th>
                      </tr>
                      {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="py-2">
                            {reservation.customerFirstName}{" "}
                            {reservation.customerLastName}
                          </td>
                          <td>{reservation.hotelName}</td>
                          <td>{formatDate(reservation.checkinDate)}</td>
                          <td>{formatDate(reservation.checkoutDate)}</td>
                          <td>{reservation.roomType}</td>
                          <td>{reservation.hotelRoomId}</td>
                          <td>{formatCurrency(reservation.totalPayment)}</td>
                          <td>{reservation.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
