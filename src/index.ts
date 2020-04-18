#!/usr/bin/env node

import Kacheck from "./kacheck/kacheck";

const config = require("../config.json")

const kacheck = new Kacheck(config);
kacheck.process();
