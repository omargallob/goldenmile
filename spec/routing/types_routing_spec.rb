require "spec_helper"

describe TypesController do
  describe "routing" do

    it "recognizes and generates #index" do
      { :get => "/types" }.should route_to(:controller => "types", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/types/new" }.should route_to(:controller => "types", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/types/1" }.should route_to(:controller => "types", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/types/1/edit" }.should route_to(:controller => "types", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/types" }.should route_to(:controller => "types", :action => "create")
    end

    it "recognizes and generates #update" do
      { :put => "/types/1" }.should route_to(:controller => "types", :action => "update", :id => "1")
    end

    it "recognizes and generates #destroy" do
      { :delete => "/types/1" }.should route_to(:controller => "types", :action => "destroy", :id => "1")
    end

  end
end
