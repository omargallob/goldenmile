require 'spec_helper'

describe "subtypes/show.html.erb" do
  before(:each) do
    @subtype = assign(:subtype, stub_model(Subtype,
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
  end
end
