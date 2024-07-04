let modif = {
    type:'string',
    ingredient:'string'
}

let foodOrderedSchema = {
    id:'int',
    food:'food.id',
    is_ready:'bool',
    id_restaurant:'restaurant.id',
    part:'int',
    mods_ingredients: [modif],
    details:['food.details'],
    note:'string',
}


export default foodOrderedSchema;