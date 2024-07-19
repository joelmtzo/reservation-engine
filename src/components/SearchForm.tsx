export default function ({
  hotels,
  checkin,
  checkout,
  setCheckin,
  setCheckout,
  handleClick,
  handleChange,
  isLoading,
}) {
  return (
    <div className="row">
      <div className="col mx-auto">
        <div className="card">
          <div className="card-body">
            <table className="table table-responsive table-striped text-center">
              <tr>
                <td className="px-1">
                  <label>Hotel</label>
                  <br />
                  <select
                    className="form-select"
                    onChange={() => handleChange()}
                  >
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} - {hotel.city}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-1 col-3">
                  <label>Checkin</label>
                  <br />
                  <input
                    type="date"
                    className="form-control"
                    value={checkin}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") handleClick();
                    }}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </td>
                <td className="px-1 col-3">
                  <label>Checkout</label>
                  <br />
                  <input
                    type="date"
                    className="form-control"
                    value={checkout}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") handleClick();
                    }}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </td>
                <td className="px-1">
                  <br />
                  <input
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleClick()}
                    className="btn btn-primary mt-2 px-3 btn-sm"
                    value="Buscar"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
