export default function HotelResults({
  availableHotels,
  makeReservation,
  isLoading
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="row">
      <div className="col-12 mx-auto py-5">
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Cargando información</p>
          </div>
        )}

        {availableHotels &&
          availableHotels.map((hotel) => (
            <div key={hotel.hotelName} className="card text-center">
              <div className="card-body">
                <h3>{hotel.hotelName} en {hotel.city}</h3>
                <p className="py-3">Estas son nuestras opciones disponibles</p>
                <table className="table table-responsive table-striped table-bordered text-center">
                  <tbody>
                    <tr>
                      <th>Tipo de habitacion</th>
                      <th>Capacidad</th>
                      <th>Precio</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                    {hotel.rooms.map((room) => (
                      <tr key={room.roomType}>
                        <td>{room.roomType}</td>
                        <td>{room.capacity}</td>
                        <td>{formatter.format(room.pricePerNight)}</td>
                        <td>{formatter.format(room.pricePerNight * hotel.totalDays)}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => makeReservation(room.roomType)}
                          >
                            Seleccionar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
