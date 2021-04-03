class AddDefaulImageToRecipes < ActiveRecord::Migration[6.1]
  def change
    change_column_default :recipes, :image, from: nil, to: "default-meal.jpg"
  end
end
