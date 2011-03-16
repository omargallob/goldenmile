# Configures your navigation
SimpleNavigation::Configuration.run do |navigation|
  navigation.selected_class = 'active'
  navigation.items do |primary|
    primary.dom_id = 'front'  
    primary.item :home, "Home", root_path
    #primary.item :logout, "Logout", destroy_user_session_path
  end

end