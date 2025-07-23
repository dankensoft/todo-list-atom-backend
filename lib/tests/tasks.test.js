"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/api/app"));
describe('Rutas de Tareas General', () => {
    it('should return unauthorized without token', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/tasks');
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});
//# sourceMappingURL=tasks.test.js.map