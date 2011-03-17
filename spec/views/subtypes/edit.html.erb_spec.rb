require 'spec_helper'

describe "subtypes/edit.html.erb" do
  before(:each) do
    @subtype = assign(:subtype, stub_model(Subtype,
      :name => "MyString"
    ))
  end

  it "renders the edit subtype form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => subtypes_path(@subtype), :method => "post" do
      assert_select "input#subtype_name", :name => "subtype[name]"
    end
  end
end
