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
exports.getExamplesFromDatabase = void 0;
/**
 * Fetches examples from the database asynchronously.
 * @returns {Promise<{id: number, name: string}[]>} An array of example objects
 */
function getExamplesFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // Implement your database access logic here
        return [
            { id: 1, name: 'Example 1' },
            { id: 2, name: 'Example 2' },
        ];
    });
}
exports.getExamplesFromDatabase = getExamplesFromDatabase;
