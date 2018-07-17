class UsersController < ApplicationController

  def index
    if params[:keyword] == ""
      @users = []
    else
      @users = User.where('name LIKE(?) and name != ?', "%#{params[:keyword]}%", "#{current_user.name}" )
    end

    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
