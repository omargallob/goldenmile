require 'spec_helper'

describe "properties/index.html.erb" do
  before(:each) do
    assign(:properties, [
      stub_model(Property,
        :category => "Category",
        :subtype => "Subtype",
        :bath => 1,
        :beds => 1,
        :built => 1,
        :constructed => 1,
        :terrace => 1,
        :garden => 1,
        :furniture => "Furniture",
        :home_appliances => "Home Appliances",
        :other_rooms => "Other Rooms",
        :security => "Security",
        :store_room => "Store Room",
        :condition => "Condition",
        :swimming_pool => "Swimming Pool",
        :views => "Views",
        :orientation => "Orientation",
        :kitchen => "Kitchen",
        :parking => "Parking",
        :description => "MyText"
      ),
      stub_model(Property,
        :category => "Category",
        :subtype => "Subtype",
        :bath => 1,
        :beds => 1,
        :built => 1,
        :constructed => 1,
        :terrace => 1,
        :garden => 1,
        :furniture => "Furniture",
        :home_appliances => "Home Appliances",
        :other_rooms => "Other Rooms",
        :security => "Security",
        :store_room => "Store Room",
        :condition => "Condition",
        :swimming_pool => "Swimming Pool",
        :views => "Views",
        :orientation => "Orientation",
        :kitchen => "Kitchen",
        :parking => "Parking",
        :description => "MyText"
      )
    ])
  end

  it "renders a list of properties" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Category".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Subtype".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Furniture".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Home Appliances".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Other Rooms".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Security".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Store Room".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Condition".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Swimming Pool".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Views".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Orientation".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Kitchen".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Parking".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
