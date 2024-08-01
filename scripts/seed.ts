import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Event, EventsSchema } from '../src/events/events.schema';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const OPTIONS = {

};

mongoose.connect(MONGODB_URI, OPTIONS);

const EVENT_MODEL = mongoose.model(Event.name, EventsSchema);

const events = [
   {
      name: "Torino Comics",
      description: "Fiera del fumetto di Torino",
      date: new Date("2024-08-01T18:25:43.511Z"),
   },
   {
      name: "Romics",
      description: "Fiera del fumetto di Roma",
      date: new Date("2024-08-05T18:25:43.511Z"),
   },
   {
      name: "Lucca Comics",
      description: "Fiera del fumetto di Lucca",
      date: new Date("2024-08-10T18:25:43.511Z"),
   },
];

async function seedDB() {
   await EVENT_MODEL.deleteMany({}).then(
      () => console.log("Data removed succesfully!")).catch(
         (error) => console.log(error)
      );
   await EVENT_MODEL.insertMany(events);
   console.log("Database population done!");
   mongoose.disconnect();
}

seedDB().catch(err => {
   console.error(err);
   mongoose.disconnect();
});

