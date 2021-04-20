class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    if user
      render json: user.as_json(only: [:first_name, :last_name, :username, :id, :bio])
    else
      render json: user.errors
    end
  end

  private

  def user
    @user ||= User.find(params[:id])
  end
end
