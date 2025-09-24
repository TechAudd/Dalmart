export const testResponse = async (req, res) => {
  try {
    const data = {
      name: "DuoDecimal",
      project: "Dal Mart",
    };
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
