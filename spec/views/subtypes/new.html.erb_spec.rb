require 'spec_helper'

describe "subtypes/new.html.erb" do
  before(:each) do
    assign(:subtype, stub_model(Subtype,
      :name => "MyString"
    ).as_new_record)
  end

  it "renders new subtype form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => subtypes_path, :method => "post" do
      assert_select "input#subtype_name", :name => "subtype[name]"
    end
  end
end
