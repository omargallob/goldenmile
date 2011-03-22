class Admin::SubpagesController <  Admin::PagesController
  def new
    
    @page = Page.find(params[:page_id])
    @section = @page.section
    @subpage = Subpage.new
  end
  def create
    @page = Page.find(params[:page_id])
    @section = @page.section
    @subpage = @page.subpages.create(params[:subpage])
   # @subpage.category = nil
    if @subpage.save
      redirect_to admin_section_page_path(@page.section,@page)
    else
      render :action => :new, :notice => @subpage.errors
    end
  end 
  def edit
     @page = Page.find(params[:page_id])
     @subpage = @page.subpages.find(params[:id])
  end
  def update
     @page = Page.find(params[:page_id])
     @subpage = @page.subpages.find(params[:id])
        if @subpage.update_attributes(params[:subpage])
          redirect_to admin_section_page_path(@page.section,@page)
        else
          render :action => :edit
        end
  end
  def destroy
       @page = Page.find(params[:page_id])
       @subpage = @page.subpages.find(params[:id])
       @subpage.delete
      redirect_to admin_page_subpages_path(@page)
  end 
end
