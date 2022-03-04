import {
  getMinifiedRecords,
  table,
  findRecordByFilter,
} from "../../lib/airtable";
const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighborhood, address, voting, imgUrl } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          if (name) {
            const createdRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createdRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "NAME is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "ID is missing" });
      }
    } catch (err) {
      console.error("error create or find store", err);
      res.status(500);
      res.json({ message: "error create or find store", err });
    }
  } else {
    res.json({ message: "Not post" });
  }
};

export default createCoffeeStore;
