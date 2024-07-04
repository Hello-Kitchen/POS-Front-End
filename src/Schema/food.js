import ingredientSchema from './ingredient'

let foodSchema = {
    id:'int',
    name:'string',
    price:'int',
    id_category:'food_category.id',
    id_restaurant:'restaurant.id',
    details:['detail.data'],
    ingredients: [ingredientSchema]
}

export default foodSchema;