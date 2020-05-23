import { Client } from "https://deno.land/x/mysql/mod.ts";
import config from '../config.js';

const client = await new Client().connect(config);

export default client
