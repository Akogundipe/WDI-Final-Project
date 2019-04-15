class TripsController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login, :index, :show]
  def index
    @user = User.find(params[:user_id])
    @buses = Bus.where(user_id: @user.id)
    render json: @buses
  end

  def show
    @user = User.find(params[:user_id])
    @bus = Bus.find(params[:id])
    render json: { buses: Bus.all }
  end

  def new
    @user = User.find(params[:user_id])
    @bus = Bus.new
  end

  # def create
  #   @user = User.find(params[:user_id])
  #   @bus = Bus.new(bus_params)
  #   if @bus.save
  #     redirect_to user_bus_path(@user,@bus)
  #    end
  # end
  def create
    @user = User.find(params[:user_id])
    bus = @user.buses.create!(bus_params)
    render json: { bus: bus }
  end

  def edit
    @user = User.find(params[:user_id])
    @bus = Bus.find(params[:id])
  end

  # def update
  #   @user = User.find(params[:user_id])
  #   @bus = Bus.find(params[:id])
  #   if @bus.update_attributes(bus_params)
  #     redirect_to user_bus_path(@user,@bus)
  #   end
  # end
  def update
    @bus = Bus.find(params[:id])
    if @bus.user == current_user
      @bus.update!(bus_params)
      render json: { bus: @bus }
    else
      render :unauthorized
    end
  end

  def destroy
    @user = User.find(params[:user_id])
    @bus = Bus.find(params[:id])
    @bus.destroy
    redirect_to user_bus_path(@user)
  end

  private

  def bus_params
    params.permit(:origin, :destination, :user_id)
  end
  # def bus_params
  #   params.permit(:origin, :destination)
  # end

end
