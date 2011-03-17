class Admin::PropertyTypesController < Admin::BaseController
  def index
    @property_types = PropertyType.find_main
  end

  def show
    @property_type = PropertyType.find(params[:id])
  end

  def new
    @property_type = PropertyType.new
  end

  def create
    @property_type = PropertyType.new(params[:property_type])
    if @property_type.save
      redirect_to admin_property_types_path, :notice => "Successfully created property type."
    else
      render :action => 'new'
    end
  end

  def edit
    @property_type = PropertyType.find(params[:id])
  end

  def update
    @property_type = PropertyType.find(params[:id])
    if @property_type.update_attributes(params[:property_type])
      redirect_to  admin_property_types_path, :notice  => "Successfully updated property type."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @property_type = PropertyType.find(params[:id])
    @property_type.destroy
    redirect_to property_types_url, :notice => "Successfully destroyed property type."
  end
end
