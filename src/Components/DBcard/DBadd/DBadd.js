import React from "react";
import detailSchema from '../../../Schema/detail'
import foodSchema from '../../../Schema/food'
import foodCategorySchema from '../../../Schema/foodCategory'
import foodOrderedSchema from '../../../Schema/foodOrdered'
import ingredientSchema from '../../../Schema/ingredient'
import orderSchema from '../../../Schema/order'
import permissionSchema from '../../../Schema/permission'
import restaurantSchema from '../../../Schema/restaurant'
import userSchema from '../../../Schema/user'

const mapping = {
    "detail": detailSchema,
    "food": foodSchema,
    "food_category": foodCategorySchema,
    "food_ordered": foodOrderedSchema,
    "ingredient": ingredientSchema,
    "order": orderSchema,
    "user": userSchema,
    "restaurant": restaurantSchema,
    "permission": permissionSchema,
};

const DBadd = ({ tableName }) => {
    const schema = mapping[tableName];

    return (
        <div className="border-2 rounded flex flex-col">
            {
                Object.entries(schema).map((entry) => {
                    return (
                        <div>
                            <p>{`${entry[0]} ${entry[1]}`}</p>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default DBadd;