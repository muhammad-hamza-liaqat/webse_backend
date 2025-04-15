const yup = require("yup");
const StatusCodes = require("http-status-codes")

const addProductValidation = (req, res, next) => {
    console.log(req.body, "yup")
    const schema = yup.object({
        productTitle: yup.string().required('productTitle is required'),
        productDescription: yup.string().required('productDescription is required'),
        quantity: yup.number().required('quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
        price: yup.number().required('price is required').positive('Price must be a positive number'),
    })

    try {
        schema.validateSync(req.body, { abortEarly: false })
        console.log('validation passed!')
        next()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors })
    }
}

const editProductValidation = (req, res, next) => {

    const schema = yup.object({
        productTitle: yup.string().notRequired(),
        productDescription: yup.string().notRequired(),
        quantity: yup
            .number()
            .notRequired()
            .positive('Quantity must be a positive number')
            .integer('Quantity must be an integer'),
        price: yup
            .number()
            .notRequired()
            .positive('Price must be a positive number'),
    }).strict(true).noUnknown(true);

    try {
        schema.validateSync(req.body, { abortEarly: false });
        console.log('Validation passed!');
        next();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
    }
}

module.exports = {
    addProductValidation,
    editProductValidation
}
