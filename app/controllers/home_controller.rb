class HomeController < ApplicationController
  def index
    @section = Section.find(:first,:conditions =>{:name => "Property"})
    @categories  =  @section.pages.all.map{|c| c.category }.uniq 
    @pages = []
    @categories.delete_if{|cat| cat == "child"}.each_with_index do |c,i|
        @pages[i] = Page.find(:all,:conditions =>{:category => "#{c}"})
    end
    #@pages = Page.find(:all,:conditions =>{:category => "Property Info"})
  end

end
