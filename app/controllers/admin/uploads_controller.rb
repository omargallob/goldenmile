class Admin::UploadsController < ApplicationController
  def create
    @page = Page.find(params[:page_id])
    @gallery = @page.galleries.find(params[:gallery_id])
    @upload = @gallery.uploads.create!(params[:upload])
    redirect_to admin_section_page_gallery_path(@page.section, @page, @gallery), :notice => "Upload created!"
  end 
  def destroy
      @page = Page.find(params[:page_id])
      @gallery = @page.galleries.find(params[:gallery_id])
    @upload = @gallery.uploads.find(params[:id])
    @upload.delete
     redirect_to admin_section_page_gallery_path(@page.section, @page, @gallery), :notice => "Upload deleted!"
  end 
end
