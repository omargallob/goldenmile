class Admin::SubtypesController <  Admin::BaseController
 def create
   @type = Type.find(params[:type_id])
   @subtype = @type.subtypes.create!(params[:subtype])
   redirect_to [:admin,@type], :notice => "Subtype Created"
 end 
 def destroy
    @type = Type.find(params[:type_id])
   @subtype = @type.subtypes.criteria.id(params[:id])
   @subtype.destroy
  redirect_to [:admin,@type], :notice => "Subtype Deleted"
 end 
end
