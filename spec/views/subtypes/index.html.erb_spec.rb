require 'spec_helper'

describe "subtypes/index.html.erb" do
  before(:each) do
    assign(:subtypes, [
      stub_model(Subtype,
        :name => "Name"
      ),
      stub_model(Subtype,
        :name => "Name"
      )
    ])
  end

  it "renders a list of subtypes" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
