class  Admin::PagesController < Admin::BaseController
  # GET /pages
  # GET /pages.xml
  def index
    
    @section = Section.find(params[:section_id])
    @pages = @section.pages

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @pages }
    end
  end

  # GET /pages/1
  # GET /pages/1.xml
  def show
        @section = Section.find(params[:section_id])
    @page = Page.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @page }
    end
  end

  # GET /pages/new
  # GET /pages/new.xml
  def new
    
    @section = Section.find(params[:section_id])
    @page = @section.pages.new
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @page }
    end
  end

  # GET /pages/1/edit
  def edit
        @section = Section.find(params[:section_id])
    @page = @section.pages.find(params[:id])
  end

  # POST /pages
  # POST /pages.xml
  def create
    @section = Section.find(params[:section_id])
    @page = Page.create(params[:page])
    

    respond_to do |format|
      if @page.save
          @section.pages << @page
        format.html { redirect_to(admin_section_path(@page.section.id), :notice => 'Page was successfully created.') }
        format.xml  { render :xml => @page, :status => :created, :location => @page }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /pages/1
  # PUT /pages/1.xml
  def update
    @page = Page.find(params[:id])

    respond_to do |format|
      if @page.update_attributes(params[:page])
        format.html { redirect_to(admin_section_path(@page.section.id), :notice => 'Page was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.xml
  def destroy
    @page = Page.find(params[:id])
    @page.destroy

    respond_to do |format|
      format.html { redirect_to(admin_section_pages_url(@page.section.id)) }
      format.xml  { head :ok }
    end
  end
end
