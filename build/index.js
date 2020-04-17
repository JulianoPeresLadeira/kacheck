#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var kacheck_1 = __importDefault(require("./kacheck/kacheck"));
var config = require("../config.json");
var kacheck = new kacheck_1.default(config);
kacheck.process();
