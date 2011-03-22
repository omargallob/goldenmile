require 'spec_helper'

describe "galleries/index.html.erb" do
  before(:each) do
    assign(:galleries, [
      stub_model(Gallery,
        :title => "Title",
        :description => "MyText"
      ),
      stub_model(Gallery,
        :title => "Title",
        :description => "MyText"
      )
    ])
  end

  it "renders a list of galleries" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
