"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resend_1 = require("resend");
const secrets_1 = require("../secrets");
const resend = new resend_1.Resend(secrets_1.RESEND_API_KEY);
exports.default = resend;
