export const filterMenuByRole = (menus, userRole) => {
  return menus
    .filter((menu) => {
      if (!menu.minRole) return true;
      return userRole >= menu.minRole;
    })
    .map((menu) => {
      if (menu.children) {
        return {
          ...menu,
          children: filterMenuByRole(menu.children, userRole),
        };
      }
      return menu;
    });
};
