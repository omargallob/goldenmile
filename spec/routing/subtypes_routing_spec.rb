require "spec_helper"

describe SubtypesController do
  describe "routing" do

    it "recognizes and generates #index" do
      { :get => "/subtypes" }.should route_to(:controller => "subtypes", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/subtypes/new" }.should route_to(:controller => "subtypes", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/subtypes/1" }.should route_to(:controller => "subtypes", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/subtypes/1/edit" }.should route_to(:controller => "subtypes", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/subtypes" }.should route_to(:controller => "subtypes", :action => "create")
    end

    it "recognizes and generates #update" do
      { :put => "/subtypes/1" }.should route_to(:controller => "subtypes", :action => "update", :id => "1")
    end

    it "recognizes and generates #destroy" do
      { :delete => "/subtypes/1" }.should route_to(:controller => "subtypes", :action => "destroy", :id => "1")
    end

  end
end
