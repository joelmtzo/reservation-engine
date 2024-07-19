import axios from "axios";

async function getHotels() {
    return await axios.get("http://localhost:5158/api/Hotel");
}

export default { getHotels };