import foodOrderedSchema from './foodOrdered'

let orderSchema = {
    id: 'int',
    food_ordered:[foodOrderedSchema],
    date:'string',
    channel:'string',
    number:'string',
    id_restaurant:'restaurant.id',
    part:'int',
}

export default orderSchema;