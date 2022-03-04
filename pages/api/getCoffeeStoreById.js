import { findRecordByFilter } from "../../lib/airtable";
const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.status(500), res.json({ message: "Not found ID" });
      }
    } else {
      res.status(400), res.json({ message: "ID is misssing" });
    }
  } catch (err) {
    res.status(500), res.json({ message: "algo va mal", err });
  }
};
export default getCoffeeStoreById;
