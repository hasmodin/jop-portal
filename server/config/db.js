import mongoose from "mongoose";

//function to connect mongodb database

const connect = async () => {
  await mongoose.connect(`${process.env.MONGO_URI}/job-portal`);
};
connect()
  .then((result) => {
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

export default connect;
