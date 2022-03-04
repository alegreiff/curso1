import { fetchCoffeStores } from "../../lib/coffestores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    //console.log("LATITUD ES", latLong);
    const response = await fetchCoffeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    //console.log("There is an error", err);
    res.status(500);
    res.json({ message: "errorrr", err });
  }
};

export default getCoffeeStoresByLocation;
