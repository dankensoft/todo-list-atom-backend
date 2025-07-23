"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/api/app"));
describe('Pruebas GET Y POST', () => {
    it('GET /api/tasks sin token retorna 401', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/tasks');
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Unauthorized');
    });
    it('POST /api/user sin email retorna 400', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/user').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Email is required');
    });
});
//# sourceMappingURL=app.test.js.map