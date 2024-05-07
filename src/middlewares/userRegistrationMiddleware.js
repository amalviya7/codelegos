"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const registrationSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    first_name: zod_1.z.string({
        required_error: 'First Name is required',
        invalid_type_error: 'First Name must be a string',
    }),
    last_name: zod_1.z.string({
        required_error: 'Last name is required',
        invalid_type_error: 'Name must be a string',
    }),
    contact_number: zod_1.z
        .string({
        required_error: 'Mobile number is required',
    })
        .length(10),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
    })
        .min(8, 'Minimum length should be 8'),
    displayPicture: zod_1.z.string().optional(),
    userType: zod_1.z.string(),
    status: zod_1.z.string(),
})
    .strict();
const validateRegistrationData = (req, res, next) => {
    try {
        registrationSchema.parse(req.body);
        next();
    }
    catch (error) {
        console.info('Validation Error : ', error);
        res.status(400).send({ success: false, message: error.issues[0].message });
    }
};
exports.default = validateRegistrationData;
