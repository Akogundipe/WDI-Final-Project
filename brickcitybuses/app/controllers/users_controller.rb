class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def create
    name = params[:email]
    email = params[:email]
    password = params[:password]

    new_user = User.new({
      name: name,
      password: password,
      email: email,
    })

    if new_user.valid?
      new_user.save!
      user_data = {
        name: user.name,
        email: user.email
      }
      render json: { user: user_data, token: gen_token(new_user.id)}
    else
      render nothing: true, status: 401
    end
  end

  def login
    email = params[:email]
    password = params[:password]

    user = User.find_from_credentials email, password
    if user.nil?
      render nothing: true, status: 401
    else
      render json: {user: user, token: gen_token(user.id)}
    end
  end

  def verify
    ensure_signed_in
    render json: { user: current_user }
  end
end
# class UsersController < ApplicationController
#   class UsersController
#     def index
#       @users = User.all
#     end
#
#     def show
#       @user = User.find(params[:id])
#     end
#
#     def new
#       @user = User.new
#     end
#
#     def create
#       @user = User.new(user_params)
#       if @user.save
#         redirect_to @user
#        end
#     end
#
#     def edit
#       @user = User.find(params[:id])
#     end
#
#     def update
#       @user = User.find(params[:id])
#       if @user.update_attributes(user_params)
#         redirect_to @user
#       end
#     end
#
#     def destroy
#       @user = User.find(params[:id])
#       @user.destroy
#       redirect_to users_path
#     end
#
#     private
#
#     def user_params
#       params.require(:user).permit(:name, :bio, :password)
#     end
#   end
# end
