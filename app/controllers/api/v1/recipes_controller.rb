class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: [:update, :destroy]

  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    recipe = Recipe.new(recipe_params)
    recipe.user_id = current_user.id
    if recipe.save
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  def update
    recipe&.update(recipe_params)
    render json: {message: 'Recipe edited!'}
  end

  def user_recipes
    user = User.find(params[:id])
    render json: user.recipes
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :image, :ingredients, :instruction)
  end

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end

  def set_recipe
    if Recipe.find(params[:id]).user != current_user
      render json: {message: 'Action not allowed'}
    end
  end
end
