"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updatedEvent = exports.createEvent = void 0;
const __1 = require("..");
const createEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield __1.prismaClient.event.create({
        data: Object.assign({}, eventData),
    });
    return event;
});
exports.createEvent = createEvent;
const updatedEvent = () => { };
exports.updatedEvent = updatedEvent;
const deleteEvent = () => { };
exports.deleteEvent = deleteEvent;
