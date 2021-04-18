class Api::V1::UsersController < ApplicationController
  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def show
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user
    @user ||= User.find(params[:id])
  end
end
