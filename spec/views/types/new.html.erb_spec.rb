require 'spec_helper'

describe "types/new.html.erb" do
  before(:each) do
    assign(:type, stub_model(Type,
      :name => "MyString"
    ).as_new_record)
  end

  it "renders new type form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => types_path, :method => "post" do
      assert_select "input#type_name", :name => "type[name]"
    end
  end
end
