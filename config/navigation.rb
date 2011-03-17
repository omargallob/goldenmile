# Configures your navigation
SimpleNavigation::Configuration.run do |navigation|
  navigation.selected_class = 'active'
  navigation.items do |primary|
    primary.dom_id = 'front'  
    primary.item :home, "Home", root_path
    primary.item :properties, "Properties", properties_path
  end

end