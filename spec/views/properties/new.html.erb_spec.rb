require 'spec_helper'

describe "properties/new.html.erb" do
  before(:each) do
    assign(:property, stub_model(Property,
      :category => "MyString",
      :subtype => "MyString",
      :bath => 1,
      :beds => 1,
      :built => 1,
      :constructed => 1,
      :terrace => 1,
      :garden => 1,
      :furniture => "MyString",
      :home_appliances => "MyString",
      :other_rooms => "MyString",
      :security => "MyString",
      :store_room => "MyString",
      :condition => "MyString",
      :swimming_pool => "MyString",
      :views => "MyString",
      :orientation => "MyString",
      :kitchen => "MyString",
      :parking => "MyString",
      :description => "MyText"
    ).as_new_record)
  end

  it "renders new property form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => properties_path, :method => "post" do
      assert_select "input#property_category", :name => "property[category]"
      assert_select "input#property_subtype", :name => "property[subtype]"
      assert_select "input#property_bath", :name => "property[bath]"
      assert_select "input#property_beds", :name => "property[beds]"
      assert_select "input#property_built", :name => "property[built]"
      assert_select "input#property_constructed", :name => "property[constructed]"
      assert_select "input#property_terrace", :name => "property[terrace]"
      assert_select "input#property_garden", :name => "property[garden]"
      assert_select "input#property_furniture", :name => "property[furniture]"
      assert_select "input#property_home_appliances", :name => "property[home_appliances]"
      assert_select "input#property_other_rooms", :name => "property[other_rooms]"
      assert_select "input#property_security", :name => "property[security]"
      assert_select "input#property_store_room", :name => "property[store_room]"
      assert_select "input#property_condition", :name => "property[condition]"
      assert_select "input#property_swimming_pool", :name => "property[swimming_pool]"
      assert_select "input#property_views", :name => "property[views]"
      assert_select "input#property_orientation", :name => "property[orientation]"
      assert_select "input#property_kitchen", :name => "property[kitchen]"
      assert_select "input#property_parking", :name => "property[parking]"
      assert_select "textarea#property_description", :name => "property[description]"
    end
  end
end
