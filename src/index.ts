import "./db/positions";
import "./db/machine-issues";

import dotenv from "dotenv";

import { cli } from "./cli";
import { initializeFirebase } from "./firebase";

dotenv.config();

initializeFirebase();

cli.initialize();
