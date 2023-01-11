import Joi from 'joi'

const schema = Joi.object({
    topic: Joi.string().trim().min(4).max(255).required(),

    amount: Joi.number().required(),

    urgencyId: Joi.number().valid(1, 2, 3).required(),
})

export default schema
