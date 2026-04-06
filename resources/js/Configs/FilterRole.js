export const filterMenuByRole = (menus, userLevel) => {
    return menus
        .filter((menu) => {
            if (!menu.minLevel) return true;
            return userLevel >= menu.minLevel;
        })
        .map((menu) => {
            if (menu.children) {
                return {
                    ...menu,
                    children: filterMenuByRole(menu.children, userLevel),
                };
            }
            return menu;
        });
};
