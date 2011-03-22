class Admin::GalleriesController < Admin::BaseController
  # GET /galleries
  # GET /galleries.xml
  def index
    
    @galleries = Gallery.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @galleries }
    end
  end

  # GET /galleries/1
  # GET /galleries/1.xml
  def show
    @page = Page.find(params[:page_id])
    @gallery = @page.galleries.find(params[:id])
    @upload = @gallery.uploads.new
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @gallery }
    end
  end

  # GET /galleries/new
  # GET /galleries/new.xml
  def new
    @page = Page.find(params[:page_id])
    @gallery = Gallery.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @gallery }
    end
  end

  # GET /galleries/1/edit
  def edit
    @gallery = Gallery.find(params[:id])
  end

  # POST /galleries
  # POST /galleries.xml
  def create
      @page = Page.find(params[:page_id])
    @gallery = @page.galleries.build(params[:gallery])
 
    respond_to do |format|
      if @gallery.save
        format.html { redirect_to(admin_section_page_gallery_path(@page.section,@page,@gallery), :notice => 'Gallery was successfully created.') }
        format.xml  { render :xml => admin_gallery_path(@gallery), :status => :created, :location => @gallery }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @gallery.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /galleries/1
  # PUT /galleries/1.xml
  def update
    @gallery = Gallery.find(params[:id])

    respond_to do |format|
      if @gallery.update_attributes(params[:gallery])
        format.html { redirect_to(admin_section_page_gallery_path(@page.section,@page,@gallery), :notice => 'Gallery was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @gallery.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /galleries/1
  # DELETE /galleries/1.xml
  def destroy
    @page = Page.find(params[:page_id])
    @gallery = @page.galleries.find(params[:id])
 
    @gallery.delete

    respond_to do |format|
      format.html { redirect_to(admin_section_page_path(@page.section,@page)) }
      format.xml  { head :ok }
    end
  end
end
