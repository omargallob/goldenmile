require 'spec_helper'

describe "properties/show.html.erb" do
  before(:each) do
    @property = assign(:property, stub_model(Property,
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
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Category/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Subtype/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Furniture/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Home Appliances/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Other Rooms/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Security/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Store Room/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Condition/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Swimming Pool/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Views/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Orientation/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Kitchen/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Parking/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/MyText/)
  end
end
